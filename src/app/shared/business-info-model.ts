export class BusinessInfo {
  constructor(
    public name: string,
    public descriptionEn: string,
    public descriptionFr: string,
    public categoryEn: string,
    public categoryFr: string,
    public location: string,
    public phone: string,
    public hours: string,
    public email: string,
    public website: string,
    public facebook: string,
    public instagram: string,
    public twitter: string,
    public images: string[],
    public logoImageUrl: string
  ) {}
}
