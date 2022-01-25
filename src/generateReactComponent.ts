import { Uri, window, workspace } from "vscode";

const jsFileTemplate = (name: any) =>
  `
import React from 'react';
import css from 'index.module.less';

const ${name} = () => {
  return null;
}

export default ${name};`.trim();

export default async (uri?: Uri) => {
  if (!uri) {
    return window.showErrorMessage("No file path found.");
  }

  const componentName = await window.showInputBox({
    prompt: "Component name",
  });

  if (!componentName) {
    return window.showErrorMessage("No component name passed");
  }

  workspace.fs.writeFile(
    Uri.file(`${uri.path}/${componentName}/index.jsx`),
    new Uint8Array(Buffer.from(jsFileTemplate(componentName)))
  );

  workspace.fs.writeFile(
    Uri.file(`${uri.path}/${componentName}/index.module.less`),
    new Uint8Array(Buffer.from(""))
  );
};
