import React, { PropsWithChildren, ReactElement } from 'react';

function Figure(props: PropsWithChildren) {
  return null;
}

function Description(props: PropsWithChildren) {
  return null;
}

function Citation(props: PropsWithChildren) {
  return null;
}

function Data(props: PropsWithChildren) {
  return null;
}

function Comp() {
  return (
    <Figure>
      <Description />
      <Data>
        ...
      </Data>
      <Citation />
    </Figure>
  );
}

type JsxIssuesProps = {
  some: string
};
function JsxIssuesComp({ some }: JsxIssuesProps) {
  return <div>{some}</div>;
}

type JsxIssuesOtherProps = {
  other: string
};
function JsxIssuesOtherComp({ other }: JsxIssuesOtherProps) {
  return <div>{other}</div>;
}

function Parent({ children } : { children: ReactElement<JsxIssuesProps, typeof JsxIssuesComp> }) {
  return children;
}

function DemoAsExpected() {
  return (
    <Parent>
      <JsxIssuesComp some="..." />
    </Parent>
  );
}

// NOT and error! Type safety for children is not given!
// Either this should be an error or declaring types on children should
function DemoShouldError() {
  return (
    <Parent>
      <JsxIssuesOtherComp other="..." />
    </Parent>
  );
}

const jsxHtmlElement = <div />;
const createHtmlElement = React.createElement('div');
const jsxElement = <JsxIssuesComp some="test" />;
const createElement = React.createElement(JsxIssuesComp, { some: 'test' });
const createOtherElement = React.createElement(JsxIssuesOtherComp, { other: 'test' });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Even though they compile to the same thing, they are not typed the same way!  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// JSX.Element
// React.ReactElement<any, any>
type JsxElementType = typeof jsxElement;

// FunctionComponentElement<JsxIssuesProps>
type CreateElementType = typeof createElement;

// FunctionComponentElement<JsxIssuesOtherComp>
type CreateOtherElementType = typeof createOtherElement;

const anyIsDeadly: JsxElementType = createOtherElement; // this does not cause an error!
// const thisIsAnError: CreateElementType = createOtherElement; // this causes an error, as it should!
