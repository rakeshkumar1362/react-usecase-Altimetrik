import { useContext, createContext } from "react";



export const AddInfoContext = createContext({
  vehicles: [
    {
      id: 1,
      name: "MB",
    },
  ],
  addInfo: (vehicle) => {},
});

export const useAddInfo = () => {
  return useContext(AddInfoContext);
};

export const AddInfoProvider = AddInfoContext.Provider
