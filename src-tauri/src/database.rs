use sqlx::{migrate::MigrateDatabase, sqlite::SqlitePoolOptions, Sqlite};
use tauri::{App, Manager};

use crate::Db;

pub async fn setup_db(app: &App) -> Db {
    let mut path = app
        .path()
        .app_data_dir()
        .expect("Failed to get app data dir");

    match std::fs::create_dir_all(path.clone()) {
        Ok(_) => {}
        Err(e) => {
            panic!("Failed to create app data dir: {}", e);
        }
    }

    path.push("reverie.sqlite");

    Sqlite::create_database(
        format!(
            "sqlite:{}",
            path.to_str().expect("path should be something")
        )
        .as_str(),
    )
    .await
    .expect("Failed to create database");

    let db = SqlitePoolOptions::new()
        .connect(path.to_str().unwrap())
        .await
        .unwrap();

    sqlx::migrate!("./migrations")
        .run(&db)
        .await
        .expect("Failed to run migrations");

    db
}
