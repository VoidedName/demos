import React, { useState } from 'react';

type ComponentProps = { value: number };
function Component({
  value,
}: ComponentProps) {
  // these association breaks with iffy keys
  const [state, setState] = useState(0);
  const [createdWith] = useState(value);
  return (
    <li>
      <button type="button" onClick={() => setState(state + 1)}>
        prop=
        {value}
        ; createdWith=
        {createdWith}
        ; state=
        {state}
        ;
      </button>
    </li>
  );
}

type KeysProps = {
  values: number[]
};

function ProperKeys({
  values,
}: KeysProps) {
  return (
    <div>
      Proper Keys:
      <ul>
        {/* Using value as object ID, in reality your component will probably have some sort of id */}
        {values.map((value) => <Component key={value} value={value} />)}
      </ul>
    </div>
  );
}

function NoKeys({
  values,
}: KeysProps) {
  return (
    <div>
      No Keys:
      <ul>
        {/* this will default to array index */}
        {values.map((value) => <Component value={value} />)}
      </ul>
    </div>
  );
}

function IndexKeys({
  values,
}: KeysProps) {
  return (
    <div>
      Index Keys:
      <ul>
        {/* this will mismatch state on reorder */}
        {/* eslint-disable-next-line react/no-array-index-key */}
        {values.map((value, idx) => <Component key={idx} value={value} />)}
      </ul>
    </div>
  );
}

function RandomKeys({
  values,
}: KeysProps) {
  return (
    <div>
      Random Keys:
      <ul>
        {/* this will reset state every time */}
        {values.map((value) => <Component key={Math.random()} value={value} />)}
      </ul>
    </div>
  );
}

export default function KeysDemo() {
  const [values, setValues] = useState([1, 0]);

  return (
    <>
      <h2>Key property behavior.</h2>
      <p>
        `Prepend Value` will add the next largest value to the beginning of `values`
      </p>
      <p>
        `Rotate Values` will move the first item of `values` to the end of `values`
      </p>
      <p>
        Play with prepend and rotate to discover the different behaviors due to key difference.
      </p>
      <button type="button" onClick={() => setValues([values.length, ...values])}>Prepend Value</button>
      <button type="button" onClick={() => setValues([...values.slice(1), values[0]])}>Rotate Values</button>
      <div>
        values=[
        {values.join(', ')}
        ]
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '1rem',
      }}
      >
        <ProperKeys values={values} />
        <NoKeys values={values} />
        <IndexKeys values={values} />
        <RandomKeys values={values} />
      </div>
    </>
  );
}
