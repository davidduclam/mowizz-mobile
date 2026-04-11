import { searchMedia } from ".";

describe("searchMedia", () => {
  it("returns search results when the API responds successfully", async () => {
    const apiResponse = [
      { id: 1, mediaType: "movie", title: "Movie A" },
      { id: 2, mediaType: "tv", name: "TV Show A" },
    ];
    const expected = [
      { id: 1, mediaType: "movie", title: "Movie A" },
      { id: 2, mediaType: "tv-show", name: "TV Show A" },
    ];
    let requestedUrl = "";

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      requestedUrl = String(input);
      return {
        ok: true,
        json: async () => apiResponse,
      } as Response;
    }) as typeof fetch;

    const result = await searchMedia("star");

    expect(requestedUrl).toContain("/search/multi?query=star");
    expect(result).toEqual(expected);
  });

  it("throws an error when the API response is not ok", async () => {
    globalThis.fetch = (async () =>
      ({ ok: false }) as Response) as typeof fetch;

    await expect(searchMedia("star")).rejects.toThrow("Failed to fetch search");
  });
});
