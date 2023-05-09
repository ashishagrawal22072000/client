import React from "react";

export const Contact = ({ contacts, currentUser }) => {
  console.log(contacts);
  return (
    <>
      <div className="border-indigo-600">
        <h1 className="text-center text-white text-2xl font-bold">Chat App</h1>
        <div className="">
          {contacts.map((ele) => {
            return (
              <>
                <div className="flex p-4 hover:bg-purple-500">
                  <img
                    className="rounded-full"
                    src={`data:image/svg+xml;base64,${ele.avatarImage}`}
                    height="50"
                    width="50"
                  />
                  <div className="mx-3">
                    <h1 className="text-white font-bold">{ele.username}</h1>
                    <p className="text-white">Hey! How are you</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="">
                <div className="flex p-4 hover:bg-purple-500">
                  <img
                    className="rounded-full"
                    src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
                    height="50"
                    width="50"
                  />
                  <div className="mx-3">
                    <h1 className="text-white font-bold">{currentUser?.username}</h1>
                    <p className="text-white">Hey! How are you</p>
                  </div>
                </div>
        </div>
      </div>
    </>
  );
};
