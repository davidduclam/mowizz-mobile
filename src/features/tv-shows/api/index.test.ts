import { fetchTvShowDetails, fetchTvShows } from ".";

describe("fetchTvShows", () => {
  it("returns movies when the API responds successfully", async () => {
    const mockMovies = [{ id: 1, title: "Movie A" }];
    let requestedUrl = "";

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      requestedUrl = String(input);
      return {
        ok: true,
        json: async () => mockMovies,
      } as Response;
    }) as typeof fetch;

    const result = await fetchTvShows("popular");

    expect(requestedUrl).toContain("/shows/popular");
    expect(result).toEqual(mockMovies);
  });

  it("throws an error when the API response is not ok", async () => {
    globalThis.fetch = (async () =>
      ({ ok: false }) as Response) as typeof fetch;

    await expect(fetchTvShows("top-rated")).rejects.toThrow(
      "Failed to fetch top-rated tv shows",
    );
  });
});

describe("fetchTvShowDetails", () => {
  it("returns movie details when the API responds successfully", async () => {
    const mockMovieDetail = { id: 1, title: "Movie A" };
    let requestedUrl = "";

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      requestedUrl = String(input);
      return {
        ok: true,
        json: async () => mockMovieDetail,
      } as Response;
    }) as typeof fetch;

    const result = await fetchTvShowDetails(1245);

    expect(requestedUrl).toContain("/shows/1245");
    expect(result).toEqual(mockMovieDetail);
  });

  it("throws an error when the API response is not ok", async () => {
    globalThis.fetch = (async () =>
      ({ ok: false }) as Response) as typeof fetch;

    await expect(fetchTvShowDetails(1245)).rejects.toMatchObject({
      message: "Failed to fetch tv show",
    });
  });
});
