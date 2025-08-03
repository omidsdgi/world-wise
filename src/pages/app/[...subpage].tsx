// import AppLayout from "../applayout";
// import { useRouter } from "next/router";
//
// export default function AppSubPage() {
//     const router = useRouter();
//
//     // آدرس فعلی مثل /app/cities یا /app/countries
//     const path = router.asPath;
//
//     let content = null;
//
//     if (path.startsWith("/app/cities")) {
//         const CityList = require("@/components/CityList").default;
//         content = <CityList />;
//     } else if (path.startsWith("/app/countries")) {
//         const CountryList = require("@/components/CountryList").default;
//         content = <CountryList />;
//     } else {
//         content = <p style={{ padding: "2rem" }}>Page not found</p>;
//     }
//
//     return <AppLayout>{content}</AppLayout>;
// }