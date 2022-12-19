import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum SocialNetwork {
  TWITTER = 'twitter',
  DISCORD = 'discord',
  TELEGRAM = 'telegram',
}

@Entity()
export class Accounts {
  @PrimaryColumn('text')
  id: string;

  @Column()
  community_id: string;

  @Column({
    default: false,
    nullable: false,
  })
  is_community_account: boolean;

  @Column()
  added_by: string;

  @Column({
    type: 'enum',
    enum: SocialNetwork,
    nullable: false,
  })
  network: SocialNetwork;

  @Column()
  platform_handle: string;

  @Column({ nullable: false })
  platform_id: string;

  @Column()
  platform_name: string;

  @Column({
    default: false,
    nullable: false,
  })
  platform_verified: boolean;

  @Column()
  platform_profile_img: string;

  @Column()
  refresh_token: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ nullable: true })
  max_scanned_content_id: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_scanned_at: Date;

  @Column({ type: 'jsonb', nullable: true })
  platform_metrics: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_contribution_at: Date;

  @Column({ nullable: true })
  last_contributing_community: string;

  @Column()
  access_token: string;

  @Column({ type: 'timestamptz' })
  token_expiration: Date;
}
