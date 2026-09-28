create table subscription_plans (
    id uuid primary key,
    name varchar(120) not null unique,
    price decimal(12,2) not null,
    billing_cycle varchar(20) not null check (billing_cycle in ('MONTHLY', 'YEARLY')),
    description varchar(500) not null,
    created_at timestamp with time zone not null
);

create index subscription_plans_name_idx on subscription_plans(name);

create table user_subscriptions (
    id uuid primary key,
    user_id uuid not null,
    plan_id uuid not null,
    status varchar(20) not null check (status in ('ACTIVE', 'SUSPENDED', 'CANCELLED')),
    started_at timestamp with time zone not null,
    expires_at timestamp with time zone,
    constraint fk_user_subscriptions_plan foreign key (plan_id) references subscription_plans(id)
);

create index user_subscriptions_user_idx on user_subscriptions(user_id, started_at desc);
create index user_subscriptions_status_idx on user_subscriptions(status);
