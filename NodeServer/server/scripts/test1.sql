SELECT `Device`.`id`, `Device`.`name`, `Device`.`description`, `Device`.`mode`, `Device`.`state`, `Device`.`manualStart`, 
`Device`.`manualDuration`, `Device`.`manualSolenoid`, `Device`.`pumpSolenoid`, 
`Device`.`softwareVersion`, `Device`.`createdAt`, `Device`.`updatedAt`, 
`schedules`.`id` AS `schedules.id`, `schedules`.`name` AS `schedules.name`, 
`schedules`.`start` AS `schedules.start`, 
`schedules`.`duration` AS `schedules.duration`, 
`schedules`.`repeat` AS `schedules.repeat`, 
`schedules`.`interval` AS `schedules.interval`, 
`schedules`.`enabled` AS `schedules.enabled`, 
`schedules`.`createdAt` AS `schedules.createdAt`, 
`schedules`.`updatedAt` AS `schedules.updatedAt`, 
`schedules`.`deviceId` AS `schedules.deviceId` 
FROM `Devices` AS `Device` 
LEFT OUTER JOIN `Schedules` AS `schedules` ON `Device`.`id` = `schedules`.`deviceId` 
WHERE `Device`.`id` = '1';