export const up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .raw(
      `CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';`
    )
    .createTable('projects', table => {
      table.uuid('id').primary()
      table.string('name')
    })
    .createTable('users', table => {
      table.uuid('id').primary()
      table.string('name')
      table.string('email')
      table.string('password')
    })
    .createTable('navers', table => {
      table.uuid('id').primary()
      table.string('name')
      table.string('email')
      table.string('job_role')
      table.date('admission_date')
      table.date('birthdate')
      table.uuid('user_id')
      table.foreign('user_id').references('id').inTable('users')
    })
    .createTable('navers-projects', table => {
      table.uuid('id').primary()
      table.uuid('project_id').references('projects.id')
      table.uuid('naver_id').references('navers.id')
    })
    .createTable('logs', table => {
      table.uuid('id').primary()
      table.string('level')
      table.string('message')
      table.json('meta')
      table.timestamp('timestamp', { useTz: true }).defaultTo(knex.fn.now())
    })

export const down = knex =>
  knex.schema
    .dropTableIfExists('navers-projects', true)
    .dropTableIfExists('projects', true)
    .dropTableIfExists('navers', true)
    .dropTableIfExists('logs', true)
    .dropTableIfExists('users', true)
