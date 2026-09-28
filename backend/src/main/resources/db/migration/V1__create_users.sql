create table users (
    id uuid primary key,
    first_name varchar(80) not null,
    last_name varchar(80) not null,
    email varchar(255) not null,
    phone varchar(30) not null,
    password_hash varchar(255) not null,
    role varchar(20) not null check (role in ('TENANT', 'LANDLORD', 'ADMIN')),
    status varchar(30) not null check (status in ('ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'DEACTIVATED')),
    created_at timestamp with time zone not null
);

create unique index users_email_unique on users(email);
create index users_role_idx on users(role);
create index users_status_idx on users(status);
