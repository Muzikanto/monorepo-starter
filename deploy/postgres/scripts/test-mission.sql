update main.game_user_agent set "raidId" = null;
truncate main.game_user_mission;
truncate main.game_user_mission_stage;
truncate main.game_raid;
truncate main.game_raid_agent;
truncate main.game_raid_item;
truncate main.game_battle_player;
truncate main.game_battle;
truncate main.battle_log;

delete from main.game_mission_offer where "missionId" = 'mission-0';
insert into main.game_mission_offer
("id", "missionId", "userId", "difficulty", "expiredAt", "createdAt")
VALUES
  ('bnxrz5FgDYe6nIZHENrOiJgK', 'mission-0', 'nkfV0KTlTu2iDNfgPxB0GO37', 'Hike', '2023-12-28 04:39:40.397', '2023-08-27 10:39:40.397');
insert into main.game_mission_offer
("id", "missionId", "userId", "difficulty", "expiredAt", "createdAt")
VALUES
  ('bnxrz5FgDYe6nIZHENrOiJg1', 'mission-0', 'l8PfP8exyrJlft8eXotUZttf', 'Hike', '2023-12-28 04:39:40.397', '2023-08-27 10:39:40.397');
insert into main.game_mission_offer
("id", "missionId", "userId", "difficulty", "expiredAt", "createdAt")
VALUES
  ('bnxrz5FgDYe6nIZHENrOiJg2', 'mission-0', 'pjXKOINtlCkmdX8YCbK6bSh6', 'Hike', '2023-12-28 04:39:40.397', '2023-08-27 10:39:40.397');
insert into main.game_mission_offer
("id", "missionId", "userId", "difficulty", "expiredAt", "createdAt")
VALUES
  ('bnxrz5FgDYe6nIZHENrOiJg3', 'mission-0', 'ihqUquJVbUyTsXwnCT2fS17p', 'Hike', '2023-12-28 04:39:40.397', '2023-08-27 10:39:40.397');
insert into main.game_mission_offer
("id", "missionId", "userId", "difficulty", "expiredAt", "createdAt")
VALUES
  ('bnxrz5FgDYe6nIZHENrOiJg4', 'mission-0', 'oqKMKECdBNjBuUv1f5MmvZqo', 'Hike', '2023-12-28 04:39:40.397', '2023-08-27 10:39:40.397');
