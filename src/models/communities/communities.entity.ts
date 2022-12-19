import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Communities {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;
}
