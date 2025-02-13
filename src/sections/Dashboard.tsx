"use client";
import React, { useCallback, useEffect } from "react";
import { ProfileModel, FilterModel } from "@/types";
import ProfileOverview from "@/sections/ProfileOverview";
import ProfileFilter from "@/components/ProfileFilter/ProfileFilter";
import ProfileTable from "@/components/ProfileTable/ProfileTable";
import ProfileFooter from "@/components/ProfileFooter/ProfileFooter";

const Dashboard = () => {
  const [total, setTotal] = React.useState(0);
  const [matched, setMatched] = React.useState(0);
  const [curPage, setCurPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
  const [profile, setProfile] = React.useState<ProfileModel | null>(null);
  const [overview, setOverview] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [profiles, setProfiles] = React.useState<ProfileModel[]>([]);
  const [filter, setFilter] = React.useState<FilterModel>({
    name: "",
    age: 0,
    location: "",
    funding: "",
  });

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const filterParams = filter
        ? Object.entries(filter).reduce(
            (acc: Record<string, string>, [key, value]) => {
              if (value) {
                acc[key] = value.toString();
              }
              return acc;
            },
            {}
          )
        : {};

      const queryParams = new URLSearchParams({
        ...filterParams,
      }).toString();

      const response = await fetch(
        `/api/profiles?page=${curPage}&limit=${limit}&${queryParams}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setProfiles(data.data);
      setTotal(data.total);
      setMatched(data.matched);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  }, [curPage, limit, filter]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (profile: ProfileModel) => {
    setProfiles(
      profiles.map((p) => (p.userId === profile.userId ? profile : p))
    );
    setProfile(profile);
  };

  const handleOverview = (profile: ProfileModel) => {
    setProfile(profile);
    setOverview(true);
  };

  const handleOverviewClose = () => {
    setOverview(false);
  };

  return (
    <>
      <div className="relative p-5 flex flex-1 flex-col gap-6 overflow-auto">
        <ProfileOverview
          profile={profile}
          show={overview}
          handleUpdate={handleUpdate}
          handleClose={handleOverviewClose}
        />
        <ProfileFilter filter={filter} handleChange={handleFilterChange} />
        <ProfileTable
          loading={loading}
          profiles={profiles}
          handleOverview={handleOverview}
        />
        <ProfileFooter
          total={total}
          matched={matched}
          curPage={curPage}
          limit={limit}
          setCurPage={setCurPage}
          setLimit={setLimit}
        />
      </div>
    </>
  );
};

export default Dashboard;
