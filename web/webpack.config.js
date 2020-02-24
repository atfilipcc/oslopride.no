/* eslint-disable */
const webpack = require("webpack");
const path = require("path");

const config = {
	entry: ["react-hot-loader/patch", "./src/index.tsx"],
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.ts(x)?$/,
				use: ["awesome-typescript-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.svg$/,
				use: ["url-loader"]
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts"],
		alias: {
			"react-dom": "@hot-loader/react-dom"
		}
	},
	devServer: {
		contentBase: "./public"
	}
};

module.exports = config;