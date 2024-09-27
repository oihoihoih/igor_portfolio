export class Project {
  constructor(
    public _id: string,
    public title: string,
    public year: number,
    public director: string,
    public DOP: string,
    public imageUrl: string,
    public genre: string,
    public trailerUrl: string,
    public imdbUrl: string
  ) {}
}
