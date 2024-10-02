import { environment } from '../../environments/environments';

const baseUrl = environment.baseUrl;

export class Project {
  constructor(
    public _id: string,
    public title: string,
    public year: number,
    public director: string,
    public dop: string,
    public img: string,
    public category: string,
    public trailerUrl: string
  ) {}
}
