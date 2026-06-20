const permissions = [
  [
    'perm_all',
    '*',
    'all',
    'all',
    'Super Admin',
    'All permissions (super admin only)',
  ],
  [
    'perm_admin_access',
    'admin.access',
    'admin',
    'access',
    'Admin Access',
    'Access to admin area',
  ],
  [
    'perm_admin_users_read',
    'admin.users.read',
    'users',
    'read',
    'Read Users',
    'View user list and details',
  ],
  [
    'perm_admin_users_write',
    'admin.users.write',
    'users',
    'write',
    'Write Users',
    'Create and update users',
  ],
  [
    'perm_admin_users_delete',
    'admin.users.delete',
    'users',
    'delete',
    'Delete Users',
    'Delete users',
  ],
  [
    'perm_admin_posts_read',
    'admin.posts.read',
    'posts',
    'read',
    'Read Posts',
    'View post list and details',
  ],
  [
    'perm_admin_posts_write',
    'admin.posts.write',
    'posts',
    'write',
    'Write Posts',
    'Create and update posts',
  ],
  [
    'perm_admin_posts_delete',
    'admin.posts.delete',
    'posts',
    'delete',
    'Delete Posts',
    'Delete posts',
  ],
  [
    'perm_admin_categories_read',
    'admin.categories.read',
    'categories',
    'read',
    'Read Categories',
    'View category list and details',
  ],
  [
    'perm_admin_categories_write',
    'admin.categories.write',
    'categories',
    'write',
    'Write Categories',
    'Create and update categories',
  ],
  [
    'perm_admin_categories_delete',
    'admin.categories.delete',
    'categories',
    'delete',
    'Delete Categories',
    'Delete categories',
  ],
  [
    'perm_admin_payments_read',
    'admin.payments.read',
    'payments',
    'read',
    'Read Payments',
    'View payment list and details',
  ],
  [
    'perm_admin_subscriptions_read',
    'admin.subscriptions.read',
    'subscriptions',
    'read',
    'Read Subscriptions',
    'View subscription list and details',
  ],
  [
    'perm_admin_credits_read',
    'admin.credits.read',
    'credits',
    'read',
    'Read Credits',
    'View credit list and details',
  ],
  [
    'perm_admin_credits_write',
    'admin.credits.write',
    'credits',
    'write',
    'Write Credits',
    'Grant or consume credits',
  ],
  [
    'perm_admin_apikeys_read',
    'admin.apikeys.read',
    'apikeys',
    'read',
    'Read API Keys',
    'View API key list and details',
  ],
  [
    'perm_admin_apikeys_write',
    'admin.apikeys.write',
    'apikeys',
    'write',
    'Write API Keys',
    'Create and update API keys',
  ],
  [
    'perm_admin_apikeys_delete',
    'admin.apikeys.delete',
    'apikeys',
    'delete',
    'Delete API Keys',
    'Delete API keys',
  ],
  [
    'perm_admin_settings_read',
    'admin.settings.read',
    'settings',
    'read',
    'Read Settings',
    'View system settings',
  ],
  [
    'perm_admin_settings_write',
    'admin.settings.write',
    'settings',
    'write',
    'Write Settings',
    'Update system settings',
  ],
  [
    'perm_admin_roles_read',
    'admin.roles.read',
    'roles',
    'read',
    'Read Roles',
    'View roles and permissions',
  ],
  [
    'perm_admin_roles_write',
    'admin.roles.write',
    'roles',
    'write',
    'Write Roles',
    'Create and update roles',
  ],
  [
    'perm_admin_roles_delete',
    'admin.roles.delete',
    'roles',
    'delete',
    'Delete Roles',
    'Delete roles',
  ],
  [
    'perm_admin_permissions_read',
    'admin.permissions.read',
    'permissions',
    'read',
    'Read Permissions',
    'View permission list and details',
  ],
  [
    'perm_admin_permissions_write',
    'admin.permissions.write',
    'permissions',
    'write',
    'Write Permissions',
    'Create and update permissions',
  ],
  [
    'perm_admin_permissions_delete',
    'admin.permissions.delete',
    'permissions',
    'delete',
    'Delete Permissions',
    'Delete permissions',
  ],
  [
    'perm_admin_ai_tasks_read',
    'admin.ai-tasks.read',
    'ai-tasks',
    'read',
    'Read AI Tasks',
    'View AI task list and details',
  ],
  [
    'perm_admin_ai_tasks_write',
    'admin.ai-tasks.write',
    'ai-tasks',
    'write',
    'Write AI Tasks',
    'Create and update AI tasks',
  ],
  [
    'perm_admin_ai_tasks_delete',
    'admin.ai-tasks.delete',
    'ai-tasks',
    'delete',
    'Delete AI Tasks',
    'Delete AI tasks',
  ],
];

const roles = [
  [
    'role_super_admin',
    'super_admin',
    'Super Admin',
    'Full system access with all permissions',
    'active',
    1,
    ['perm_all'],
  ],
  [
    'role_admin',
    'admin',
    'Admin',
    'Administrator with most permissions',
    'active',
    2,
    [
      'perm_admin_access',
      'perm_admin_users_read',
      'perm_admin_users_write',
      'perm_admin_users_delete',
      'perm_admin_posts_read',
      'perm_admin_posts_write',
      'perm_admin_posts_delete',
      'perm_admin_categories_read',
      'perm_admin_categories_write',
      'perm_admin_categories_delete',
      'perm_admin_payments_read',
      'perm_admin_subscriptions_read',
      'perm_admin_credits_read',
      'perm_admin_credits_write',
      'perm_admin_apikeys_read',
      'perm_admin_apikeys_write',
      'perm_admin_apikeys_delete',
      'perm_admin_settings_read',
      'perm_admin_ai_tasks_read',
      'perm_admin_ai_tasks_write',
      'perm_admin_ai_tasks_delete',
    ],
  ],
  [
    'role_editor',
    'editor',
    'Editor',
    'Content editor with limited permissions',
    'active',
    3,
    [
      'perm_admin_access',
      'perm_admin_posts_read',
      'perm_admin_posts_write',
      'perm_admin_categories_read',
      'perm_admin_categories_write',
    ],
  ],
  [
    'role_viewer',
    'viewer',
    'Viewer',
    'Read-only access to admin area',
    'active',
    4,
    [
      'perm_admin_access',
      'perm_admin_users_read',
      'perm_admin_posts_read',
      'perm_admin_categories_read',
      'perm_admin_payments_read',
      'perm_admin_subscriptions_read',
      'perm_admin_credits_read',
    ],
  ],
];

function q(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

const now = "(cast((julianday('now') - 2440587.5)*86400000 as integer))";
const lines = [];

for (const [id, code, resource, action, title, description] of permissions) {
  lines.push(
    `INSERT OR IGNORE INTO permission (id, code, resource, action, title, description, created_at, updated_at) VALUES (${q(id)}, ${q(code)}, ${q(resource)}, ${q(action)}, ${q(title)}, ${q(description)}, ${now}, ${now});`
  );
}

for (const [
  id,
  name,
  title,
  description,
  status,
  sort,
  permissionIds,
] of roles) {
  lines.push(
    `INSERT OR IGNORE INTO role (id, name, title, description, status, sort, created_at, updated_at) VALUES (${q(id)}, ${q(name)}, ${q(title)}, ${q(description)}, ${q(status)}, ${sort}, ${now}, ${now});`
  );
  for (const permissionId of permissionIds) {
    lines.push(
      `INSERT OR IGNORE INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES (${q(`rp_${id}_${permissionId}`)}, ${q(id)}, ${q(permissionId)}, ${now}, ${now});`
    );
  }
}

process.stdout.write(`${lines.join('\n')}\n`);
