// import React, { useState, createContext, useContext } from "react"

// const currentUserContext = createContext({
//   currentUser: '',
//   setcurrentUser: () => {},
// });

// const currentUserUserProvider = ({ children }) => {
//   const [currentUser, setcurrentUser] = useState()

//   return (
//     <currentUserContext.Provider value={{ currentUser, setcurrentUser }}>
//       {children}
//     </currentUserContext.Provider>
//   )
// }

// const usecurrentUserContext = () => useContext(currentUserContext)

// export { usecurrentUserContext, currentUserUserProvider }