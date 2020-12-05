import React from "react";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout";
import "./style.css";

export default function Home() {
	const auth = useSelector((state) => state.auth);

	if (auth.loading) {
		return <p>Loading....</p>;
	}

	return <Layout sidebar>Home</Layout>;
}
