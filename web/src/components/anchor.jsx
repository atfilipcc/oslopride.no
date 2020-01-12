import React from "react";
import { Link } from "gatsby";

export default function Anchor({ _type, text, url }) {
	switch (_type) {
		case "external_link":
			return (
				<a href={url} target="_blank" rel="noopener noreferrer">
					{text}
				</a>
			);
		case "internal_link":
			return <Link to={`/${url.slug.current}`}>{text}</Link>;
	}
}