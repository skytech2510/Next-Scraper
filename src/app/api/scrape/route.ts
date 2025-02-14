import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import playwright from "playwright";
import { connectDB } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function POST(request: Request) {
  let { ssoKey, susSession } = await request.json();
  const url = process.env.NEXT_PUBLIC_FETCH_URL;
  ssoKey = ssoKey || process.env.NEXT_PUBLIC_SSO_KEY;
  susSession = susSession || process.env.NEXT_PUBLIC_SUS_SESSION;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid URL format" + err },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    let browser;
    if (!browser) {
      browser = await playwright.chromium.launch();
    }
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });
    const page = await context.newPage();

    await page.route("**/*.{png,jpg,jpeg,gif,css}", (route) => route.abort());
    await page.route("**/*.{woff,woff2,ttf,otf}", (route) => route.abort());
    await page.route("**/{analytics,tracking,advertisement}/**", (route) =>
      route.abort()
    );

    // Set cookies before navigation
    await context.addCookies([
      {
        name: "_sso.key",
        value: ssoKey,
        domain: ".startupschool.org",
        path: "/",
      },
      {
        name: "_sus_session",
        value: susSession,
        domain: ".startupschool.org",
        path: "/",
      },
    ]);

    while (1) {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForSelector(".css-139x40p");

      const content = await page.content();
      const $ = cheerio.load(content);

      const mainContent = $(".css-139x40p");
      // console.log("mainContent: ", mainContent);

      const age = mainContent.find('[title="Age"]').text().replace(/\D/g, "");

      const profile = {
        userId: page.url().split("/").pop(),
        name: mainContent.find(".css-1s8r69b").text().trim(),
        location: mainContent.find('[title="Location"]').text().trim(),
        age: age ? parseInt(age) : null,
        lastSeen: mainContent
          .find('[title="Last seen on co-founder matching"]')
          .text()
          .replace("Last seen ", "")
          .trim(),
        avatar: mainContent.find(".css-1bm26bw").attr("src"),
        sumary: mainContent.find(".css-cyoc3t").text().trim(),
        intro: mainContent
          .find('span.css-19yrmx8:contains("Intro")')
          .next(".css-1tp1ukf")
          .text()
          .trim(),
        lifeStory: mainContent
          .find('span.css-19yrmx8:contains("Life Story")')
          .next(".css-1tp1ukf")
          .text()
          .trim(),
        freeTime: mainContent
          .find('span.css-19yrmx8:contains("Free Time")')
          .next(".css-1tp1ukf")
          .text()
          .trim(),
        other: mainContent
          .find('span.css-19yrmx8:contains("Other")')
          .next(".css-1tp1ukf")
          .text()
          .trim(),

        accomplishments: mainContent
          .find('span.css-19yrmx8:contains("Impressive accomplishment")')
          .next(".css-1tp1ukf")
          .text()
          .trim(),

        education: mainContent
          .find('.css-19yrmx8:contains("Education")')
          .next(".css-1tp1ukf")
          .find(".css-kaq1dv")
          .map((_, el) => $(el).text().trim())
          .get(),

        employment: mainContent
          .find('.css-19yrmx8:contains("Employment")')
          .next(".css-1tp1ukf")
          .find(".css-kaq1dv")
          .map((_, el) => $(el).text().trim())
          .get(),

        startup: {
          name:
            mainContent.find(".css-bcaew0 b").first().text().trim() !== ""
              ? mainContent.find(".css-bcaew0 b").first().text().trim()
              : "Potential Idea",
          description:
            mainContent.find(".css-bcaew0 b").first().text().trim() !== ""
              ? mainContent
                .find(
                  `span.css-19yrmx8:contains("${mainContent
                    .find(".css-bcaew0 b")
                    .first()
                    .text()
                    .trim()}")`
                )
                .next(".css-1tp1ukf")
                .text()
                .trim()
              : mainContent.find("div.css-1hla380").text().trim(),
          progress: mainContent
            .find('span.css-19yrmx8:contains("Progress")')
            .next(".css-1tp1ukf")
            .text()
            .trim(),
          funding: mainContent
            .find('span.css-19yrmx8:contains("Funding Status")')
            .next(".css-1tp1ukf")
            .text()
            .trim(),
        },

        cofounderPreferences: {
          requirements: mainContent
            .find(".css-1hla380 p")
            .map((_, el) => $(el).text().trim())
            .get(),
          idealPersonality: mainContent
            .find('span.css-19yrmx8:contains("Ideal co-founder")')
            .next(".css-1tp1ukf")
            .text()
            .trim(),
          equity: mainContent
            .find('span.css-19yrmx8:contains("Equity expectations")')
            .next(".css-1tp1ukf")
            .text()
            .trim(),
        },

        interests: {
          shared: mainContent
            .find(".css-1v9f1hn")
            .map((_, el) => $(el).text().trim())
            .get(),
          personal: mainContent
            .find(".css-1lw35t7")
            .map((_, el) => $(el).text().trim())
            .get(),
        },

        linkedIn: mainContent.find(".css-107cmgv").attr("title"),
      };

      // After scraping the profile data
      await Profile.findOneAndUpdate({ userId: profile.userId }, profile, {
        upsert: true,
        new: true,
      });
    }

    return NextResponse.json({ message: "Profile scraped successfully" });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : "";

    console.error("Scraping error details:", {
      message: errorMessage,
      stack: errorStack,
      url: url,
    });

    return NextResponse.json(
      { error: `Failed to scrape profile: ${errorMessage}` },
      { status: 500 }
    );
  }
}
