export type Property = {
  id: string;
  title: string;
  brand: string;
  version: string;
  width: number;
  depth: number;
  squareFootage: number;
  beds: number;
  baths: number;
  living: number;
  garage: number;
  facade: string;
  floorPlan: string;
};

const facade = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&h=560&fit=crop&auto=format&q=80`;

const plan = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&h=560&fit=crop&auto=format&q=80`;

export const properties: Property[] = [
  {
    id: "hampton-28",
    title: "The Hampton 28",
    brand: "Metricon",
    version: "2.4",
    width: 14.0,
    depth: 18.0,
    squareFootage: 28,
    beds: 4,
    baths: 2,
    living: 2,
    garage: 2,
    facade: facade("photo-1600585154340-be6161a56a0c"),
    floorPlan: plan("photo-1580587771525-78b9dba3b914")
  },
  {
    id: "bondi-24",
    title: "The Bondi 24",
    brand: "Henley Homes",
    version: "1.8",
    width: 12.5,
    depth: 16.5,
    squareFootage: 24,
    beds: 3,
    baths: 2,
    living: 1,
    garage: 2,
    facade: facade("photo-1568605114967-8130f3a36994"),
    floorPlan: plan("photo-1503387837-b154d5074bd2")
  },
  {
    id: "manhattan-32",
    title: "The Manhattan 32",
    brand: "Carlisle Homes",
    version: "3.0",
    width: 16.0,
    depth: 20.0,
    squareFootage: 32,
    beds: 4,
    baths: 3,
    living: 2,
    garage: 2,
    facade: facade("photo-1564013799919-ab600027ffc6"),
    floorPlan: plan("photo-1503387762-592deb58ef4e")
  },
  {
    id: "promenade-25",
    title: "The Promenade 25",
    brand: "Burbank Homes",
    version: "2.1",
    width: 13.0,
    depth: 17.5,
    squareFootage: 25,
    beds: 3,
    baths: 2,
    living: 1,
    garage: 2,
    facade: facade("photo-1605276373954-0c4a0dac5b12"),
    floorPlan: plan("photo-1545324418-cc1a3fa10c00")
  },
  {
    id: "vista-22",
    title: "The Vista 22",
    brand: "Simonds Homes",
    version: "1.5",
    width: 11.0,
    depth: 16.0,
    squareFootage: 22,
    beds: 3,
    baths: 1,
    living: 1,
    garage: 1,
    facade: facade("photo-1583608205776-bfd35f0d9f83"),
    floorPlan: plan("photo-1626885930974-4b69aa21bbf9")
  },
  {
    id: "riviera-34",
    title: "The Riviera 34",
    brand: "Mimosa Homes",
    version: "2.2",
    width: 18.0,
    depth: 22.0,
    squareFootage: 34,
    beds: 4,
    baths: 3,
    living: 2,
    garage: 2,
    facade: facade("photo-1512917774080-9991f1c4c750"),
    floorPlan: plan("photo-1572120360610-d971b9d7767c")
  }
];

export type PropertyView = "facade" | "floor";
