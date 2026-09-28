create table tenant_contact_preferences (
    tenant_id uuid primary key references users(id) on delete cascade,
    allow_landlord_contact boolean not null default false,
    updated_at timestamp with time zone not null default current_timestamp
);

create table room_interests (
    id uuid primary key,
    tenant_id uuid not null references users(id) on delete cascade,
    landlord_id uuid not null references users(id) on delete cascade,
    room_id varchar(100) not null,
    status varchar(30) not null default 'INTERESTED' check (status in (
        'SAVED',
        'INTERESTED',
        'CONTACTED',
        'VIEWING_REQUESTED',
        'VIEWED',
        'NO_LONGER_INTERESTED',
        'RENTED'
    )),
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp,
    unique (tenant_id, room_id)
);

create index room_interests_landlord_status_idx on room_interests(landlord_id, status, created_at desc);
create index room_interests_tenant_idx on room_interests(tenant_id, created_at desc);
