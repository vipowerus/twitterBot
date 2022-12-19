import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum SocialNetwork {
  TWITTER = 'twitter',
  DISCORD = 'discord',
  TELEGRAM = 'telegram',
}

@Entity()
export class ContributorsGraph {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source_account_id: string;

  @Column()
  target_account_id: string;

  @Column({
    type: 'enum',
    enum: SocialNetwork,
  })
  network: SocialNetwork;

  @Column({
    type: 'timestamp',
    default: null,
  })
  since: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  until: Date;

  @Column()
  removed: boolean;
}
