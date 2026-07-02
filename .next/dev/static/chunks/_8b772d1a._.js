(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/services/auth.services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAuth",
    ()=>checkAuth,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function registerUser(email, username, password) {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            username,
            password
        })
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to register user');
    }
    return data;
}
async function loginUser(email, password) {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to login");
    }
    return data;
}
async function logoutUser() {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to logout");
    }
}
async function checkAuth() {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/auth/me`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error();
    const user = await res.json();
    console.log("User:", user);
    return user;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/services/chat.services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConversation",
    ()=>createConversation,
    "getConversations",
    ()=>getConversations,
    "getUsers",
    ()=>getUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function getConversations() {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/conversations`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error();
    return res.json();
}
async function getUsers(query) {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/users/search?query=${query}`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}
async function createConversation(memberId) {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/conversations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            members: memberId,
            is_group: false
        })
    });
    if (!res.ok) throw new Error();
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/helpers/formatTime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const formatTime = (data)=>{
    const now = Date.now();
    const time = new Date(data).getTime();
    const diff = now - time;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (seconds < 10) return "now";
    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return "yesterday";
    if (days < 7) {
        return new Date(time).toLocaleDateString("en-US", {
            weekday: "short"
        });
    }
    return new Date(time).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short"
    });
};
const __TURBOPACK__default__export__ = formatTime;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/search.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/search.534c7295.png");}),
"[project]/public/search.png.mjs { IMAGE => \"[project]/public/search.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$search$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/search.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$search$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 200,
    height: 200,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAjElEQVR42k3OOwrCUBCF4fGForZWaqEWgr1Y2IpgoSAWoqAQQsqQBymygZBHm4WE7DD/hQlk4OvOnBkRkTGeyJAgxQUD0XnBwQITLOHj1AYK7PHBH18cEWIoWruCpU0msEGMqQnkOOCNO+bYwWv/uMHFGjNsUeKHnuidMyKtDWCjxlU6M9J6s9DHA1UDp/oQj0s1TZgAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/chat.services.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$highlight$2d$words$2f$dist$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-highlight-words/dist/main.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/redux/slices/chatSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/helpers/formatTime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$search$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$search$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/search.png.mjs { IMAGE => "[project]/public/search.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function Sidebar({ onSelectConversation }) {
    _s();
    const chats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "Sidebar.useSelector[chats]": (state)=>state.chat.chats
    }["Sidebar.useSelector[chats]"]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const messageNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "Sidebar.useSelector[messageNotifications]": (state)=>state.chat.unreadMessages
    }["Sidebar.useSelector[messageNotifications]"]);
    const onlineUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "Sidebar.useSelector[onlineUsers]": (state)=>state.online.users
    }["Sidebar.useSelector[onlineUsers]"]);
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "Sidebar.useSelector[user]": (state)=>state.auth.user
    }["Sidebar.useSelector[user]"]); //remove any 
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const today = Number(new Date().toISOString().slice(8, 10).replaceAll("-", ""));
    let days;
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [, setTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    timerRef.current = setTimeout(()=>{
        timerRef.current;
    }, 3000);
    console.log(messageNotifications, "message Notifications final");
    //need that to update last msg time every 60secs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const interval = setInterval({
                "Sidebar.useEffect.interval": ()=>{
                    setTick({
                        "Sidebar.useEffect.interval": (t)=>t + 1
                    }["Sidebar.useEffect.interval"]);
                }
            }["Sidebar.useEffect.interval"], 60000);
            return ({
                "Sidebar.useEffect": ()=>clearInterval(interval)
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], []);
    // useEffect(() => {
    // socket.on("receive_message", ({ conversationId, message }) => {
    //   dispatch(incrementUnread(conversationId));
    //   console.log('READ')
    //     return () => {
    //         socket.off("receive_message");
    //     };
    // })}, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const getChats = {
                "Sidebar.useEffect.getChats": async ()=>{
                    try {
                        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConversations"])();
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setChats"])(res));
                        const newObject = {};
                        for (let r of res){
                            newObject[r.id] = Number(r.unread_count);
                        }
                        ;
                        console.log('CONVERSATIONS:', res);
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUnread"])(newObject));
                    } catch (err) {
                        console.error(err);
                    }
                }
            }["Sidebar.useEffect.getChats"];
            getChats();
        }
    }["Sidebar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const fetchUsers = {
                "Sidebar.useEffect.fetchUsers": async ()=>{
                    if (search.length < 2) {
                        setUsers([]);
                        return;
                    }
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUsers"])(search);
                        setUsers(data);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }["Sidebar.useEffect.fetchUsers"];
            fetchUsers();
        }
    }["Sidebar.useEffect"], [
        search
    ]);
    console.log('chats are', chats);
    const handleSelectUser = async (user)=>{
        try {
            const newConversation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConversation"])([
                user.id
            ]);
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConversations"])();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setChats"])(res));
            onSelectConversation(newConversation);
            setSearch("");
            setUsers([]);
        } catch (err) {
            console.error(err);
        }
    };
    if (!user) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-96 bg-white h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-3 pl-6 flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$search$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$search$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                        alt: "search",
                        className: "w-[1.3rem] h-[1.3rem] "
                    }, void 0, false, {
                        fileName: "[project]/app/components/Sidebar.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: "Search...",
                        className: "w-full focus:outline-none rounded bg-white placeholder-gray-500 border-none text-black",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Sidebar.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Sidebar.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto",
                children: search.length > 1 ? users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>handleSelectUser(user),
                        className: "p-2 hover:bg-gray-200 cursor-pointer text-black",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$highlight$2d$words$2f$dist$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            highlightClassName: "bg-yellow-400 text-black",
                            searchWords: [
                                search
                            ],
                            autoEscape: true,
                            textToHighlight: user.username
                        }, void 0, false, {
                            fileName: "[project]/app/components/Sidebar.tsx",
                            lineNumber: 159,
                            columnNumber: 9
                        }, this)
                    }, user.id, false, {
                        fileName: "[project]/app/components/Sidebar.tsx",
                        lineNumber: 154,
                        columnNumber: 7
                    }, this)) : chats.map((chat)=>{
                    const otherUser = chat.participants.find((u)=>u.id !== user.id);
                    const isOnline = otherUser ? onlineUsers.includes(otherUser.id) : false;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between p-2 px-6 text-black hover:cursor-pointer hover:bg-gray-200",
                        onClick: ()=>onSelectConversation(chat),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: otherUser?.username || "unknown"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Sidebar.tsx",
                                                lineNumber: 180,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: isOnline ? "text-green-500" : "text-gray-400",
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Sidebar.tsx",
                                                lineNumber: 181,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Sidebar.tsx",
                                        lineNumber: 179,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[0.75rem] text-nowrap text-zinc-600",
                                            children: chat?.last_message?.length > 40 ? chat.last_message.slice(0, 40) + "..." : chat.last_message
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Sidebar.tsx",
                                            lineNumber: 186,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Sidebar.tsx",
                                        lineNumber: 185,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Sidebar.tsx",
                                lineNumber: 178,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full items-center",
                                children: messageNotifications[chat.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 mr-1 text-nowrap rounded-full bg-blue-500 text-white",
                                    children: [
                                        "+ ",
                                        messageNotifications[chat.id]
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Sidebar.tsx",
                                    lineNumber: 196,
                                    columnNumber: 14
                                }, this) : ""
                            }, void 0, false, {
                                fileName: "[project]/app/components/Sidebar.tsx",
                                lineNumber: 194,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text mr-1 -gray-400 text-[0.9rem]",
                                    children: chat.last_message_time ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(chat.last_message_time) : ""
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Sidebar.tsx",
                                    lineNumber: 201,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/Sidebar.tsx",
                                lineNumber: 200,
                                columnNumber: 9
                            }, this)
                        ]
                    }, chat.id, true, {
                        fileName: "[project]/app/components/Sidebar.tsx",
                        lineNumber: 174,
                        columnNumber: 7
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/components/Sidebar.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Sidebar.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "QDYL1vtsXDY/WmTfYXGol9uWhf0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/services/messages.services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMessages",
    ()=>getMessages,
    "sendMessages",
    ()=>sendMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function getMessages(conversationId, cursor) {
    let url = `${("TURBOPACK compile-time value", "http://localhost:3001")}/messages/${conversationId}`;
    if (cursor) {
        url += `?cursor=${encodeURIComponent(cursor)}`;
    }
    const res = await fetch(url, {
        credentials: "include"
    });
    if (!res.ok) throw new Error();
    return res.json();
}
async function sendMessages(conversationId, content, type = "text") {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/messages/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            conversationId,
            content,
            type
        })
    });
    if (!res.ok) throw new Error();
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/services/socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "socket",
    ()=>socket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(`${("TURBOPACK compile-time value", "http://localhost:3001")}`, {
    withCredentials: true
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/Send_icon.svg.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/Send_icon.svg.5de4c868.png");}),
"[project]/public/Send_icon.svg.png.mjs { IMAGE => \"[project]/public/Send_icon.svg.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Send_icon$2e$svg$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/Send_icon.svg.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Send_icon$2e$svg$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 3840,
    height: 3840,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAt0lEQVR42mXPPQqCcBgG8Ac/1qYiyl0cJBChwdaIhlpcopbGcErLA4SFQ7bpnKueIG/gGYRCb+Ek9kcLI9/1+b1fgKLrWLguBpIEimHQKtX3cS4KHNMUM9tGTxBA0XQDRps1TnmOS1lW8PB6YmpZ6PJ8DTsch/nNwSoMsY0i7OK4mmYkCcaa9gEOAUFAwKMCZpbCJGhiGO0VZpaRhiv6olgfrfr3n8Bpgm8p+h5Lz8NQlkGx7P+Tb5THR7utRCK/AAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/services/sticker.services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTrendingStickers",
    ()=>getTrendingStickers,
    "searchStickers",
    ()=>searchStickers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function searchStickers(query) {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/stickers/search?q=${encodeURIComponent(query)}`, {
        credentials: "include"
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Sticker API error: ${res.status} - ${text}`);
    }
    return res.json();
}
async function getTrendingStickers() {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3001")}/stickers/trending`, {
        credentials: "include"
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Sticker API error: ${res.status} - ${text}`);
    }
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Stickers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Stickers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$sticker$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/sticker.services.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Stickers({ onSelectSticker }) {
    _s();
    const [stickers, setStickers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stickers.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$sticker$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTrendingStickers"])().then(setStickers);
        }
    }["Stickers.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stickers.useEffect": ()=>{
            const timer = setTimeout({
                "Stickers.useEffect.timer": ()=>{
                    if (search.trim()) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$sticker$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchStickers"])(search).then(setStickers);
                    } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$sticker$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTrendingStickers"])().then(setStickers);
                    }
                }
            }["Stickers.useEffect.timer"], 300);
            return ({
                "Stickers.useEffect": ()=>clearTimeout(timer)
            })["Stickers.useEffect"];
        }
    }["Stickers.useEffect"], [
        search
    ]);
    const sendSticker = (sticker)=>{
        onSelectSticker(sticker.images.original.webp);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                className: "w-full h-[40px] focus:outline-none text-[18px] rounded-[18px] pl-4 bg-gray-200 placeholder-gray-500 border-none text-black",
                placeholder: "search stickers",
                value: search,
                onChange: (e)=>setSearch(e.target.value)
            }, void 0, false, {
                fileName: "[project]/app/components/Stickers.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-5 gap-2",
                children: stickers.map((sticker)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: sticker.images.fixed_width.webp,
                        onClick: ()=>sendSticker(sticker)
                    }, sticker.id, false, {
                        fileName: "[project]/app/components/Stickers.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/Stickers.tsx",
                lineNumber: 54,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Stickers.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, this);
}
_s(Stickers, "PiQZL+al75+CiUqHaONjhKQbjHE=");
_c = Stickers;
var _c;
__turbopack_context__.k.register(_c, "Stickers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/18737600.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/18737600.3af9d864.png");}),
"[project]/public/18737600.png.mjs { IMAGE => \"[project]/public/18737600.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$18737600$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/18737600.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$18737600$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAvElEQVR42j1Puw6CQBC8J3IvOAgiUSJIVEz8AT/AwsTKylhZYGVstNfY+N/eorDJJpvZmdkdhFxhQpXQo52J53fXD5gxYQr9lkxpW16kGR8YlwW0cDNgLcl3bAAQxhT4lPkZIcwABk4IbEE1EPGGeXrhq3QrdLaXweQYJvWrJ1Aucu7ppbLF2dk3Nl1/dFRdkfifcKRpOFy9TVzd4KyKysb9oNsE3ZMyyE+gVHbW9Cm6mKAKkvoJtphw3e2+GBQYNmXHbw8AAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/1286853.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/1286853.857c238c.png");}),
"[project]/public/1286853.png.mjs { IMAGE => \"[project]/public/1286853.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$1286853$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/1286853.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$1286853$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 512,
    height: 512,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAq0lEQVR42oWPKw7CQBRFS0nZA4bPQhAjKjGougbZiqaOkGCaNKkkJKCaYNA1NQgyYhYyHzOLmMl86EPUkYojbnJe3r1BkiSvPM/vZVlegTRNn23bHp1zM+99EGRZ9lBKLay1IcA5XzdNczLGhD+hKIrbEOYQgEGOpJRLIcQKGAWtdUQI2fV9vwfquj7HcfweBbjEGKOu6w5AVVUXhNDn7wvG2IZSup0uOTXzC3gbnhLQVYTzAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/services/notification.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playNotificationSound",
    ()=>playNotificationSound
]);
let audio = null;
function playNotificationSound() {
    if (!audio) {
        audio = new Audio("/universfield-new-notification-062-494544.mp3");
    }
    audio.currentTime = 0;
    audio.play().catch(()=>{});
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ChatWindow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$messages$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/messages.services.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/socket.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/redux/slices/chatSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Send_icon$2e$svg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Send_icon$2e$svg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/Send_icon.svg.png.mjs { IMAGE => "[project]/public/Send_icon.svg.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Stickers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Stickers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$18737600$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$18737600$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/18737600.png.mjs { IMAGE => "[project]/public/18737600.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$1286853$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$1286853$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/1286853.png.mjs { IMAGE => "[project]/public/1286853.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/redux/slices/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$auth$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/auth.services.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$notification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/notification.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function ChatWindow({ selectedChat }) {
    _s();
    const [pastedFile, setPastedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [typingUsers, setTypingUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "ChatWindow.useSelector[user]": (state)=>state.auth.user
    }["ChatWindow.useSelector[user]"]); //remove any
    // const logout = useSelector((state:any) => state.auth.logout);
    const [cursor, setCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isFetching, setIsFetching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const onlineUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "ChatWindow.useSelector[onlineUsers]": (state)=>state.online.users
    }["ChatWindow.useSelector[onlineUsers]"]);
    // const chats = useSelector((state: RootState) => state.chat.chats)
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedChatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(selectedChat);
    const otherUser = selectedChat?.participants.find((u)=>u.id !== user.id);
    const [isStickerOpen, setIsStickerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sticker, setSticker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    console.log("SOCKET ID", __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].id);
    const otherUserId = otherUser?.id;
    const messageNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "ChatWindow.useSelector[messageNotifications]": (state)=>state.chat.unreadMessages
    }["ChatWindow.useSelector[messageNotifications]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            selectedChatRef.current = selectedChat;
        }
    }["ChatWindow.useEffect"], [
        selectedChat
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (!selectedChat?.id) return;
            console.log("JOINING ROOM", selectedChat.id);
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit("join_conversation", selectedChat.id);
        }
    }["ChatWindow.useEffect"], [
        selectedChat
    ]);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    console.log(otherUserId, "other user");
    const isNearBottom = (el)=>{
        return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (!selectedChat) return;
            scrollToBottom();
            const load = {
                "ChatWindow.useEffect.load": async ()=>{
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$messages$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessages"])(selectedChat.id);
                    setMessages(res.slice().reverse());
                    const last = res[res.length - 1];
                    setCursor(last?.created_at);
                    setTimeout({
                        "ChatWindow.useEffect.load": ()=>{
                            messagesEndRef.current?.scrollIntoView();
                        }
                    }["ChatWindow.useEffect.load"], 0);
                }
            }["ChatWindow.useEffect.load"];
            load();
        }
    }["ChatWindow.useEffect"], [
        selectedChat
    ]);
    const shouldAutoScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].on("receive_message", {
                "ChatWindow.useEffect": ({ conversationId, message })=>{
                    if (document.hidden) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$notification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playNotificationSound"])();
                    }
                    ;
                    if (selectedChatRef.current?.id !== conversationId) return;
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit("mark_read", {
                        conversationId
                    });
                    const container = messagesEndRef.current?.parentElement;
                    shouldAutoScrollRef.current = container ? isNearBottom(container) : false;
                    setMessages({
                        "ChatWindow.useEffect": (prev)=>[
                                ...prev,
                                message
                            ]
                    }["ChatWindow.useEffect"]);
                    console.log('READ');
                }
            }["ChatWindow.useEffect"]);
            return ({
                "ChatWindow.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].off("receive_message");
                }
            })["ChatWindow.useEffect"];
        }
    }["ChatWindow.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (shouldAutoScrollRef.current) {
                messagesEndRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }
        }
    }["ChatWindow.useEffect"], [
        messages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            const handleNotification = {
                "ChatWindow.useEffect.handleNotification": ({ conversationId, message, sender })=>{
                    if (selectedChatRef.current?.id !== conversationId) {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementUnread"])(conversationId));
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$notification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playNotificationSound"])();
                    }
                    ;
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setLastMessage"])({
                        conversationId,
                        message
                    }));
                }
            }["ChatWindow.useEffect.handleNotification"];
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].on("message_notification", handleNotification);
            return ({
                "ChatWindow.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].off("message_notification", handleNotification);
                }
            })["ChatWindow.useEffect"];
        }
    }["ChatWindow.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (!selectedChat) return;
            scrollToBottom();
            const getChats = {
                "ChatWindow.useEffect.getChats": async ()=>{
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$messages$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessages"])(selectedChat.id);
                    setMessages(res.slice().reverse());
                    const last = res[res.length - 1];
                    setCursor(last?.created_at);
                    setTimeout({
                        "ChatWindow.useEffect.getChats": ()=>{
                            messagesEndRef.current?.scrollIntoView();
                        }
                    }["ChatWindow.useEffect.getChats"], 0);
                }
            }["ChatWindow.useEffect.getChats"];
            getChats();
        }
    }["ChatWindow.useEffect"], [
        selectedChat
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (!selectedChat?.id) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit("mark_read", {
                conversationId: selectedChat?.id
            });
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearUnread"])(selectedChat.id));
        }
    }["ChatWindow.useEffect"], [
        selectedChat
    ]);
    console.log(messageNotifications, "TEST");
    const toggleStickers = ()=>{
        setIsStickerOpen((s)=>!s);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            const handleMessagesRead = {
                "ChatWindow.useEffect.handleMessagesRead": ({ conversationId, userId })=>{
                    if (selectedChatRef.current?.id !== conversationId) return;
                    console.log('WORKS');
                    setMessages({
                        "ChatWindow.useEffect.handleMessagesRead": (prev)=>prev.map({
                                "ChatWindow.useEffect.handleMessagesRead": (msg)=>{
                                    if (!msg.read_by?.includes(userId)) {
                                        return {
                                            ...msg,
                                            read_by: [
                                                ...msg.read_by || [],
                                                userId
                                            ]
                                        };
                                    }
                                    return msg;
                                }
                            }["ChatWindow.useEffect.handleMessagesRead"])
                    }["ChatWindow.useEffect.handleMessagesRead"]);
                }
            }["ChatWindow.useEffect.handleMessagesRead"];
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].on("messages_read", handleMessagesRead);
            return ({
                "ChatWindow.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].off("messages_read", handleMessagesRead);
                }
            })["ChatWindow.useEffect"];
        }
    }["ChatWindow.useEffect"], []);
    const handleSendMessage = async ()=>{
        if (!selectedChat?.id) return;
        try {
            // if (pastedFile) {
            //     const { url } = await uploadImage(pastedFile);
            //     const newMessage = await sendMessages(
            //         selectedChat.id,
            //         url,
            //         "image"
            //     );
            //     dispatch(setLastMessage({
            //         conversationId: selectedChat.id,
            //         message: newMessage,
            //     }));
            //     socket.emit("send_message", {
            //         conversationId: selectedChat.id,
            //         message: newMessage,
            //         sender: user.id,
            //     });
            //     setPastedFile(null);
            //     setMessage("");
            //     return;
            // }
            if (!message.trim()) return;
            const newMessage = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$messages$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendMessages"])(selectedChat.id, message);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setLastMessage"])({
                conversationId: selectedChat.id,
                message: newMessage
            }));
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit("send_message", {
                conversationId: selectedChat.id,
                message: newMessage,
                sender: user.id
            });
            setMessage("");
            const container = messagesEndRef.current?.parentElement;
            const shouldScroll = container && isNearBottom(container);
            if (shouldScroll) {
                setTimeout(()=>{
                    messagesEndRef.current?.scrollIntoView();
                }, 0);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleSendSticker = async (url)=>{
        try {
            if (!selectedChat?.id) return;
            const newMessage = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$messages$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendMessages"])(selectedChat?.id, url, "sticker");
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setLastMessage"])({
                conversationId: selectedChat.id,
                message: newMessage
            }));
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit("send_message", {
                conversationId: selectedChat?.id,
                message: newMessage,
                sender: user.id
            });
            // setMessages(prev => [...prev, newMessage]);
            setIsStickerOpen(false);
            setMessage("");
            const container = messagesEndRef.current?.parentElement;
            const shouldScroll = container && isNearBottom(container);
            if (shouldScroll) {
                setTimeout(()=>{
                    messagesEndRef.current?.scrollIntoView();
                }, 0);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleLogout = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$auth$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"])());
            router.push("/auth/login");
        } catch (err) {
            console.error(err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            setTypingUsers([]);
        }
    }["ChatWindow.useEffect"], [
        selectedChat?.id
    ]);
    //kinda need to add typing effect for users
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            const handleUserTyping = {
                "ChatWindow.useEffect.handleUserTyping": (data)=>{
                    console.log("TYPING DATA", data);
                    if (selectedChatRef.current?.id !== data.conversationId) {
                        return;
                    }
                    if (user.id === data.id) return;
                    setTypingUsers({
                        "ChatWindow.useEffect.handleUserTyping": (prev)=>{
                            if (prev.find({
                                "ChatWindow.useEffect.handleUserTyping": (u)=>u.id === data.id
                            }["ChatWindow.useEffect.handleUserTyping"])) return prev;
                            return [
                                ...prev,
                                data
                            ];
                        }
                    }["ChatWindow.useEffect.handleUserTyping"]);
                }
            }["ChatWindow.useEffect.handleUserTyping"];
            const handleUserStopTyping = {
                "ChatWindow.useEffect.handleUserStopTyping": ({ conversationId, userId })=>{
                    setTypingUsers({
                        "ChatWindow.useEffect.handleUserStopTyping": (prev)=>prev.filter({
                                "ChatWindow.useEffect.handleUserStopTyping": (u)=>u.id !== userId
                            }["ChatWindow.useEffect.handleUserStopTyping"])
                    }["ChatWindow.useEffect.handleUserStopTyping"]);
                }
            }["ChatWindow.useEffect.handleUserStopTyping"];
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].on("user_typing", handleUserTyping);
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].on("user_stop_typing", handleUserStopTyping);
            return ({
                "ChatWindow.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].off("user_typing", handleUserTyping);
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].off("user_stop_typing", handleUserStopTyping);
                }
            })["ChatWindow.useEffect"];
        }
    }["ChatWindow.useEffect"], []);
    const handleTyping = (e)=>{
        setMessage(e.target.value);
        if (!selectedChatRef.current?.id) return;
        if (!isTyping) {
            setIsTyping(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit('typing', selectedChatRef.current?.id);
        }
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(()=>{
            setIsTyping(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit('stop_typing', selectedChatRef.current?.id);
        }, 2000);
    };
    // const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    //     for(const item of e.clipboardData.items){
    //         if (item.type.startsWith("image/")){
    //             const file = item.getAsFile();
    //             if(!file) continue;
    //             setPastedFile(file);
    //         }
    //     }
    // };
    console.log(selectedChat, 'selectedChat');
    const handleScroll = async (e)=>{
        const el = e.currentTarget;
        if (el.scrollTop > 50) return;
        if (!cursor || isFetching) return;
        setIsFetching(true);
        const prevHeight = el.scrollHeight;
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$messages$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessages"])(selectedChat.id, cursor);
        if (res.length === 0) {
            setCursor(null);
            setIsFetching(false);
            return;
        }
        setMessages((prev)=>{
            const existing = new Set(prev.map((m)=>m.id));
            const newMsgs = res.filter((m)=>!existing.has(m.id));
            return [
                ...newMsgs.reverse(),
                ...prev
            ];
        });
        setCursor(res[res.length - 1].created_at);
        requestAnimationFrame(()=>{
            el.scrollTop = el.scrollHeight - prevHeight;
            setIsFetching(false);
        });
    };
    console.log(messages, 'MESSAGES');
    const isOnline = otherUser ? onlineUsers.includes(otherUser.id) : false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full h-full",
        children: !selectedChat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-12 bg-white justify-end items-center flex text-black gap-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        alt: "logout",
                        src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$1286853$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$1286853$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                        onClick: handleLogout,
                        className: "w-[1.3rem] h-[1.3rem] hover:cursor-pointer mr-[10px]"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ChatWindow.tsx",
                        lineNumber: 468,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/ChatWindow.tsx",
                    lineNumber: 467,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex bg-zinc-900 w-full h-full justify-center items-center",
                    children: "Start a conversation"
                }, void 0, false, {
                    fileName: "[project]/app/components/ChatWindow.tsx",
                    lineNumber: 475,
                    columnNumber: 25
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ChatWindow.tsx",
            lineNumber: 466,
            columnNumber: 21
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-12 bg-white items-center justify-center flex text-black gap-1",
                    children: [
                        otherUser?.username || "unknown",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: isOnline ? "text-green-500" : "text-gray-400",
                            children: "●"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 484,
                            columnNumber: 33
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatWindow.tsx",
                    lineNumber: 482,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onScroll: handleScroll,
                    className: "flex flex-col flex-1 overflow-y-auto bg-gray-400",
                    children: [
                        messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Start messaging"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 490,
                            columnNumber: 29
                        }, this) : messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex p-2 ${m.sender_id === user.id ? "justify-end" : "justify-start"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `overflow-x-hidden max-w-[500px] ${m.sender_id === user.id ? "bg-white mb-3 max-w-[50%] px-3 py-2 rounded-lg text-black" : "bg-blue-500 mb-3 max-w-[50%] px-3 py-2 rounded-lg"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "break-words",
                                        children: [
                                            m.type === "sticker" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: m.content,
                                                alt: "sticker",
                                                className: "max-w-[180px] rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatWindow.tsx",
                                                lineNumber: 506,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: m.content
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatWindow.tsx",
                                                lineNumber: 512,
                                                columnNumber: 33
                                            }, this),
                                            m.sender_id === user.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 text-xs",
                                                children: otherUserId && m.read_by?.includes(otherUserId) ? "✓✓" : "✓"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatWindow.tsx",
                                                lineNumber: 515,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/ChatWindow.tsx",
                                        lineNumber: 504,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatWindow.tsx",
                                    lineNumber: 499,
                                    columnNumber: 33
                                }, this)
                            }, m.id, false, {
                                fileName: "[project]/app/components/ChatWindow.tsx",
                                lineNumber: 493,
                                columnNumber: 33
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end p-2",
                            children: pastedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                className: "max-w-[420px] max-h-[420px]",
                                src: URL.createObjectURL(pastedFile)
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatWindow.tsx",
                                lineNumber: 527,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 524,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: messagesEndRef
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 533,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatWindow.tsx",
                    lineNumber: 488,
                    columnNumber: 25
                }, this),
                typingUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-black px-2 bg-gray-200",
                    children: [
                        typingUsers.map((u)=>u.username).join(", "),
                        " is typing..."
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatWindow.tsx",
                    lineNumber: 536,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-12 bg-white flex items-center px-2 text-black",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Type a message...",
                            value: message,
                            onKeyDown: async (e)=>{
                                if (e.key !== 'Enter') return;
                                e.preventDefault();
                                handleSendMessage();
                            },
                            // onPaste={handlePaste}
                            onChange: handleTyping,
                            className: "w-full focus:outline-none placeholder:text-zinc-500"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 541,
                            columnNumber: 29
                        }, this),
                        isStickerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-13 right-6 w-[520px] h-[500px] bg-white shadow-lg rounded-lg overflow-y-auto z-50 no-scrollbar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Stickers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onSelectSticker: handleSendSticker
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatWindow.tsx",
                                lineNumber: 556,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 555,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            alt: "stickers",
                            onClick: toggleStickers,
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$18737600$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$18737600$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                            className: "w-[1.3rem] h-[1.3rem] mr-[10px] hover:cursor-pointer"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 559,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleSendMessage,
                            alt: "sendMsg",
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Send_icon$2e$svg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Send_icon$2e$svg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                            className: "w-[1.3rem] h-[1.3rem] hover:cursor-pointer"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatWindow.tsx",
                            lineNumber: 565,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatWindow.tsx",
                    lineNumber: 540,
                    columnNumber: 25
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ChatWindow.tsx",
            lineNumber: 481,
            columnNumber: 21
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ChatWindow.tsx",
        lineNumber: 463,
        columnNumber: 9
    }, this);
}
_s(ChatWindow, "X/Fdv/DQx1dv42ScZh5xw3nB5/Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = ChatWindow;
var _c;
__turbopack_context__.k.register(_c, "ChatWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$auth$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/auth.services.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ChatWindow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/redux/slices/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$onlineSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/redux/slices/onlineSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/socket.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isChecking, setIsChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedChat, setSelectedChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const isAuth = {
                "Home.useEffect.isAuth": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$auth$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkAuth"])();
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUser"])(data));
                    } catch  {
                        router.push("/auth/login");
                    } finally{
                        setIsChecking(false);
                    }
                }
            }["Home.useEffect.isAuth"];
            isAuth();
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].on("online_users", {
                "Home.useEffect": (users)=>{
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$onlineSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setOnlineUsers"])(users));
                }
            }["Home.useEffect"]);
            return ({
                "Home.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].off("online_users");
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    console.log(selectedChat);
    if (isChecking) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-zinc-50 font-sans dark:bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onSelectConversation: setSelectedChat
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    selectedChat: selectedChat
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(Home, "CIc2mOuvHFjD5c5XU/iHqv+Fy/g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8b772d1a._.js.map