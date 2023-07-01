import {
  semanticVersionGreaterThan,
  semanticVersionGreaterThanOrEqual,
} from './compare-versions';

describe('compare semantic versions utils', () => {
  it('should check greater than', () => {
    expect(
      semanticVersionGreaterThan(
        {
          major: 2,
          minor: 0,
          patch: 0,
        },
        {
          major: 1,
          minor: 0,
          patch: 0,
        },
      ),
    ).toBe(true);

    expect(
      semanticVersionGreaterThan(
        {
          major: 2,
          minor: 1,
          patch: 0,
        },
        {
          major: 2,
          minor: 0,
          patch: 0,
        },
      ),
    ).toBe(true);

    expect(
      semanticVersionGreaterThan(
        {
          major: 2,
          minor: 1,
          patch: 1,
        },
        {
          major: 2,
          minor: 1,
          patch: 0,
        },
      ),
    ).toBe(true);
  });

  expect(
    semanticVersionGreaterThan(
      {
        major: 2,
        minor: 0,
        patch: 0,
      },
      {
        major: 1,
        minor: 1,
        patch: 1,
      },
    ),
  ).toBe(true);

  expect(
    semanticVersionGreaterThanOrEqual(
      {
        major: 2,
        minor: 0,
        patch: 0,
      },
      {
        major: 2,
        minor: 0,
        patch: 0,
      },
    ),
  ).toBe(true);

  expect(
    semanticVersionGreaterThanOrEqual(
      {
        major: 2,
        minor: 0,
        patch: 0,
      },
      {
        major: 2,
        minor: 0,
        patch: 1,
      },
    ),
  ).toBe(false);
});
