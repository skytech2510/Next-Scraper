const ProfileFooter = ({
  total,
  matched,
  curPage,
  limit,
  setLimit,
  setCurPage,
}: {
  total: number;
  matched: number;
  curPage: number;
  limit: number;
  setLimit: (limit: number) => void;
  setCurPage: (page: number) => void;
}) => {
  const limitOptions = [10, 20, 50, 100];

  return (
    <div className="flex flex-row justify-between items-center">
      <span>Total Count: {total + " / Matched Count: " + matched}</span>
      <div className="flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-500">Items per page:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {limitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setCurPage(curPage - 1)}
          disabled={curPage === 1}
          className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="flex items-center justify-center gap-2">
          <input
            type="number"
            value={curPage}
            min={1}
            max={Math.ceil(matched / limit)}
            onChange={(e) => setCurPage(Number(e.target.value))}
            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>/</span>
          <span>{Math.ceil(matched / limit)}</span>
        </span>
        <button
          onClick={() => setCurPage(curPage + 1)}
          disabled={curPage === Math.ceil(matched / limit)}
          className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfileFooter;
