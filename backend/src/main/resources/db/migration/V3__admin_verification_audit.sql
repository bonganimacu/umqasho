alter table users add column rejection_reason text;
alter table users add column verified_at timestamp with time zone;

create table admin_audit_logs (
    id uuid primary key,
    admin_username varchar(120) not null,
    action varchar(60) not null,
    target_type varchar(60) not null,
    target_id uuid not null,
    description varchar(1000) not null,
    created_at timestamp with time zone not null default current_timestamp
);

create index admin_audit_logs_created_at_idx on admin_audit_logs(created_at desc);
create index admin_audit_logs_target_idx on admin_audit_logs(target_type, target_id, created_at desc);