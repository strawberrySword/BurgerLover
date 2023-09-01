import { Entity, Column, PrimaryGeneratedColumn, Point } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column('geometry')
  location: Point;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  rating: number;

  @Column()
  price: number;

  @Column()
  visitors: number;

  //TODO: Add a column for all reviews for this place
}
