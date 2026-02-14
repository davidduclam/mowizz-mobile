import { fetchMovieDetails, fetchMovies } from "./index";

describe("fetchMovies", () => {
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

    const result = await fetchMovies("popular");

    expect(requestedUrl).toContain("/movies/popular");
    expect(result).toEqual(mockMovies);
  });

  it("throws an error when the API response is not ok", async () => {
    globalThis.fetch = (async () =>
      ({ ok: false }) as Response) as typeof fetch;

    await expect(fetchMovies("upcoming")).rejects.toThrow(
      "Failed to fetch upcoming movies",
    );
  });
});

describe("fetchMovieDetails", () => {
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

    const result = await fetchMovieDetails(1245);

    expect(requestedUrl).toContain("/movies/1245");
    expect(result).toEqual(mockMovieDetail);
  });

  it("throws an error when the API response is not ok", async () => {
    globalThis.fetch = (async () =>
      ({ ok: false }) as Response) as typeof fetch;

    await expect(fetchMovieDetails(1245)).rejects.toMatchObject({
      message: "Failed to fetch movie details",
    });
  });
});
