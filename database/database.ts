import * as SQLite from "expo-sqlite";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const db = SQLite.openDatabaseAsync("databaseName");

async function init() {
    (await db).execAsync(
        `PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN NOT NULL
      );`
    );
}

async function getTasksByLimit(limit: number): Promise<Task[]> {
    let query = "SELECT * FROM tasks ORDER BY id DESC";



    if (limit != 0) {
        query += ` LIMIT ${limit}`;
    }

    const rows = await (await db).getAllAsync(query);

    return (rows as Task[]).map((row) => ({
        id: row.id,
        text: row.text,
        completed: row.completed,
    }));
}


async function insertOne(task: Omit<Task, 'id'>): Promise<Task | undefined> {
    try {
        const { text } = task;

        const statement = await (await db).prepareAsync(
            "INSERT INTO tasks (text, completed) VALUES ($text, $completed)"
        );

        await statement.executeAsync({
            $text: text,
            $completed: false,
        });

        const lastTasks = await getTasksByLimit(1);

        return lastTasks.length > 0 ? lastTasks[0] : undefined;
    } catch (error) {
        console.log(error);
    }
}

async function setComplete(id: number) {
    const statement = (await db).prepareAsync(
        "UPDATE tasks SET completed = NOT completed WHERE id = $id"
    );

    const updatedTask = (await statement).executeAsync({ $id: id });

    return updatedTask;
}

async function deleteOne(id: number) {
    const statement = (await db).prepareAsync("DELETE FROM tasks WHERE id = $id");
    await (await statement).executeAsync({ $id: id });

    return id;
}

export { init, getTasksByLimit, insertOne, setComplete, deleteOne };

