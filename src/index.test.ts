/* eslint-disable functional/no-return-void */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-loop-statements */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statements */

import {
  readonlyURL,
  readonlyDate,
  readonlyNow,
  readonlyMap,
  readonlyWeakMap,
  validReadonlyDate,
  readonlyURLSearchParams,
  readonlySet,
  readonlyWeakSet,
  principledArray,
  PrincipledArray,
} from ".";

describe("ReadonlyURL", () => {
  it("iterates through URL search params using for..of", () => {
    const url = readonlyURL("http://example.com?foo=a&bar=b");

    if (url === undefined) {
      // eslint-disable-next-line functional/no-throw-statements
      throw new Error("url was undefined");
    }

    // eslint-disable-next-line functional/prefer-immutable-types
    for (const p of url.searchParams) {
      // eslint-disable-next-line functional/prefer-immutable-types
      const [k, v] = p;
      if (k === "foo") {
        expect(v).toEqual("a");
      } else {
        expect(k).toEqual("bar");
        expect(v).toEqual("b");
      }
    }
  });

  it("doesn't throw on invalid input", () => {
    const url = readonlyURL("asdf");
    expect(url).toBeUndefined();
  });

  it("doesn't allow mutation via search params", () => {
    const url = readonlyURL("http://example.com");
    expect(url).toBeDefined();

    if (url === undefined) {
      // eslint-disable-next-line functional/no-throw-statements
      throw new Error("url was undefined");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    url.searchParams.append("", "");
  });
});

describe("ReadonlyURLSearchParams", () => {
  it("doesn't throw", () => {
    const x = readonlyURLSearchParams("");
    expect(x).toBeDefined();
  });
  it("allows iteration using for..of", () => {
    const params = readonlyURLSearchParams({ a: "b" });

    expect(params[Symbol.iterator]).toBeDefined();

    // eslint-disable-next-line functional/prefer-immutable-types
    for (const [k, v] of params) {
      expect(k).toBe("a");
      expect(v).toBe("b");
    }

    /* eslint-disable functional/immutable-data, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions, @typescript-eslint/ban-ts-comment */
    // @ts-expect-error
    params[Symbol.iterator] = null as any;
    /* eslint-enable functional/immutable-data, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions, @typescript-eslint/ban-ts-comment */
  });
});

describe("ReadonlyDate", () => {
  it("doesn't throw on invalid input", () => {
    const date = readonlyDate("asdf");
    expect(date.getMilliseconds()).toBeNaN();
  });

  it("doesn't throw when getting current date (now)", () => {
    const date = readonlyDate(readonlyNow());
    expect(date.getMilliseconds()).toBeGreaterThan(0);
  });
});

describe("ValidReadonlyDate", () => {
  it("returns undefined on invalid input", () => {
    const date = validReadonlyDate("asdf");
    expect(date).toBeUndefined();
  });

  it("returns a date for valid input", () => {
    // eslint-disable-next-line no-restricted-globals
    const date = validReadonlyDate(Date.now());
    expect(date).toBeDefined();
  });
});

describe("ReadonlyMap", () => {
  it("allows iteration using for..of", () => {
    const map = readonlyMap([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);

    // eslint-disable-next-line functional/prefer-immutable-types
    for (const [k, v] of map) {
      expect(k).toBeTruthy();
      expect(v).toBeTruthy();
    }
  });
});

describe("ReadonlyWeakMap", () => {
  it("doesn't throw", () => {
    const map = readonlyWeakMap([
      [{}, "one"],
      [{}, "two"],
      [{}, "three"],
    ]);

    expect(map).toBeDefined();
  });
});

describe("ReadonlySet", () => {
  it("allows iteration using for..of", () => {
    const set = readonlySet([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);

    // eslint-disable-next-line functional/prefer-immutable-types
    for (const [k, v] of set) {
      expect(k).toBeTruthy();
      expect(v).toBeTruthy();
    }
  });
});

describe("ReadonlyWeakSet", () => {
  it("doesn't throw", () => {
    const set = readonlyWeakSet([
      [{}, "one"],
      [{}, "two"],
      [{}, "three"],
    ]);

    expect(set).toBeDefined();
  });
});

describe("PrincipledArray", () => {
  it("can be mapped", () => {
    const foo = principledArray(["a"]);

    expect(foo.map((s) => s.toUpperCase())).toStrictEqual(["A"]);
  });

  it("can be flatMapped", () => {
    const foo = principledArray(["a"]);

    expect(
      foo.flatMap((s) => principledArray([s.toUpperCase()]))
    ).toStrictEqual(["A"]);
  });

  it("can be flattened", () => {
    const foo = principledArray([
      principledArray(["a"]),
      principledArray(["b"]),
    ]);

    const flattened: PrincipledArray<string> = foo.flat();

    expect(flattened).toStrictEqual(["a", "b"]);
  });

  it("can be flattened when nested level is regular array", () => {
    // eslint-disable-next-line functional/prefer-immutable-types
    const foo = principledArray([["a"], ["b"]]);

    const flattened: PrincipledArray<string> = foo.flat();

    expect(flattened).toStrictEqual(["a", "b"]);
  });

  it("can be flattened when nested level is mixed", () => {
    // eslint-disable-next-line functional/prefer-immutable-types
    const foo = principledArray([["a"], principledArray(["b"]), "c"]);

    const flattened: PrincipledArray<string> = foo.flat();

    expect(flattened).toStrictEqual(["a", "b", "c"]);
  });

  it("can be filtered with a boolean predicate", () => {
    const foo = principledArray(["a", "b"]);

    expect(foo.filter((s) => s !== "b")).toStrictEqual(["a"]);
  });

  it("can be filtered with a type guard predicate", () => {
    const foo = principledArray(["a", "b"]);

    const isLetterA = (s: string): s is "a" => s === "a";

    const aArray: PrincipledArray<"a"> = foo.filter(isLetterA);

    expect(aArray).toStrictEqual(["a"]);
  });

  // eslint-disable-next-line jest/expect-expect
  it("does not expose forEach", () => {
    const foo = principledArray(["a", "b"]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    foo.forEach(() => {});
  });

  it("can be concatenated with a single value", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat("b");

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be concatenated with another array", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat(["b"]);

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be concatenated with a spread array", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat(...["b"]);

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be concatenated with a principled array", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat(principledArray(["b"]));

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be sliced", () => {
    const foo = principledArray(["a"]);

    const bar = foo.slice(0, 1);

    expect(bar).toStrictEqual(["a"]);
  });
});
