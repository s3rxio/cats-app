export type Breed = Record<string, unknown>;

export interface Cat {
  id: string;
  url: string;

  width: number;
  height: number;

  breeds: Breed[];
}

export interface GetCatParams {
  size?: "thumb" | "small" | "med" | "full";
  mimeTypes?: "jpg" | "png" | "gif";
}

export interface GetCatsParams extends GetCatParams {
  limit?: number;
  page?: number;
}
