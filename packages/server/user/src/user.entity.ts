import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  userName: string;

  @Column()
  avatar: string;

  // @Column({
  //   select: false,
  // })
  @Column()
  password: string;
}
