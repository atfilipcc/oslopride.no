import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import { Global, css } from "@emotion/core";
import { normalize } from "polished";
import { hot } from "react-hot-loader/root";
import App from "./app";

WebFont.load({
	typekit: {
		id: "ygk6hzk"
	}
});

const globalStyles = css`
	${normalize()}

	* {
		box-sizing: border-box;
	}

	html,
	body,
	#app {
		height: 100%;
		font-size: 18px;
	}

	body {
		font-family: proxima-nova, sans-serif;
	}

	#app {
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1 0 auto;
		margin-bottom: 32px;
	}

	footer {
		flex-shrink: 0;
	}
`;

const ConfiguredApp = hot(() => (
	<>
		<Global styles={globalStyles} />
		<App />
	</>
));

const rootElement = document.getElementById("app");
ReactDOM.render(<ConfiguredApp />, rootElement);
