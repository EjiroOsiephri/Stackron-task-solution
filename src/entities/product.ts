import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "decimal" })
  price!: number;

  @Column({ type: "text" })
  imageUrl!: string;

  @Column({ type: "text" })
  category!: string;
}
