import { FilterModel } from "@/types";

const ProfileFilter = ({
  filter,
  handleChange,
}: {
  filter: FilterModel;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-nowrap text-gray-500"
          >
            User Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={filter?.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="age"
            className="block text-sm font-semibold text-nowrap text-gray-500"
          >
            Age(over):
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={filter?.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter Age"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-nowrap text-gray-500"
          >
            Location:
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={filter?.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter location"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="startup"
            className="block text-sm font-semibold text-nowrap text-gray-500"
          >
            Funding Status:
          </label>
          <input
            type="text"
            name="funding"
            id="funding"
            value={filter?.funding}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter funding"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileFilter;
