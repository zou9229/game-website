CREATE TABLE `ticket` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_ticket_user` ON `ticket` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_ticket_status` ON `ticket` (`status`);--> statement-breakpoint
CREATE TABLE `ticket_message` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`content` text NOT NULL,
	`attachments` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`ticket_id`) REFERENCES `ticket`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_ticket_message_ticket` ON `ticket_message` (`ticket_id`);--> statement-breakpoint
ALTER TABLE `apikey` ADD `key` text;--> statement-breakpoint
ALTER TABLE `apikey` ADD `last_used_at` integer;