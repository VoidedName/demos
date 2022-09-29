import React, {
  useState, Suspense, startTransition,
} from 'react';

type Resource<T> = {
  readonly read: () => T | never
};

function convertToResource<T>(promise: Promise<T>): Resource<T> {
  let state: 'pending' | 'success' | 'error' = 'pending';
  let value: T;
  let error: Error;

  promise.then((it) => {
    state = 'success';
    value = it;
  }).catch((err) => {
    state = 'error';
    error = err;
  });

  return {
    read: () => {
      switch (state) {
        case 'pending':
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw promise;
        case 'success':
          return value;
        case 'error':
          throw error;
        default: throw new Error('Should never happen!');
      }
    },
  };
}

let clickedPromise = 0;
let clickedPromiseWithDelay = 0;
let clickedResource = 0;
let clickedResourceWithTransition = 0;

function ResourceShowCaseUsingPromises() {
  const [value, setValue] = useState(0);
  return (
    <button
      type="button"
      onClick={() => new Promise((resolve) => {
        clickedPromise += 1;
        const nextClicked = clickedPromise;
        setTimeout(() => (resolve(nextClicked)));
      }).then((newValue) => { setValue(newValue as number); })}
    >
      PromiseClicked: state=
      {value}
      ;
      shouldBe=
      {clickedPromise}
    </button>
  );
}

function ResourceShowCaseUsingPromisesWithDelay() {
  const [value, setValue] = useState(0);
  return (
    <button
      type="button"
      onClick={() => new Promise((resolve) => {
        clickedPromiseWithDelay += 1;
        const nextClicked = clickedPromiseWithDelay;
        setTimeout(() => (resolve(nextClicked)), Math.random() * 2500);
      }).then((newValue) => { setValue(newValue as number); })}
    >
      PromiseWithDelayClicked: state=
      {value}
      ;
      shouldBe=
      {clickedPromiseWithDelay}
    </button>
  );
}

function DisplayResourceValue(props: { resource: Resource<any> }) {
  const { resource } = props;
  return <span>{resource.read()}</span>;
}

function ResourceShowCaseUsingResource() {
  const [value, setValue] = useState<Resource<number>>(convertToResource(Promise.resolve(0)));
  return (
    <button
      type="button"
      onClick={() => setValue(
        convertToResource(
          new Promise((resolve) => {
            clickedResource += 1;
            const nextClicked = clickedResource;
            setTimeout(() => (resolve(nextClicked)), Math.random() * 2500);
          }),
        ),
      )}
    >
      ResourceClicked: state=
      <Suspense fallback="...">
        <DisplayResourceValue resource={value} />
      </Suspense>
      ;
      shouldBe=
      {clickedResource}
    </button>
  );
}

function ResourceShowCaseUsingResourceAndTransition() {
  const [value, setValue] = useState<Resource<number>>(convertToResource(Promise.resolve(0)));
  return (
    <button
      type="button"
      onClick={() => startTransition(() => setValue(
        convertToResource(
          new Promise((resolve) => {
            clickedResourceWithTransition += 1;
            const nextClicked = clickedResourceWithTransition;
            setTimeout(() => (resolve(nextClicked)), Math.random() * 2500);
          }),
        ),
      ))}
    >
      ResourceWithTransitionClicked: state=
      <Suspense fallback="...">
        <DisplayResourceValue resource={value} />
      </Suspense>
      ;
      shouldBe=
      {clickedResourceWithTransition}
    </button>
  );
}

// export function SuspenseShowCase() {
//   return (
//     <ul>
//       <li><ResourceShowCaseUsingPromisesWithDelay /></li>
//     </ul>
//   );
// }

export function SuspenseShowCase() {
  return (
    <ul>
      <li><ResourceShowCaseUsingPromises /></li>
      <li><ResourceShowCaseUsingPromisesWithDelay /></li>
      <li><ResourceShowCaseUsingResource /></li>
      <li><ResourceShowCaseUsingResourceAndTransition /></li>
    </ul>
  );
}
