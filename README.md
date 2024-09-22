# Surface Workflow Project

## How to setup project locally

To run this project locally, clone the repository and follow these steps:

1. **Navigate to the project directory**:
   ```bash
   cd surface-workflow-project
   ```

2. **Install the dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the database**: If you're running into issues with `start-database.sh`, open the script for additional instructions for running it on Windows.
   ```bash
   ./start-database.sh 
   ```
   - Say `yes` for the random password.

4. **Push the database schema**:
   ```bash
   pnpm db:push
   ```

5. **Finally, run the development server**:
   ```bash
   pnpm dev
   ```

6. **Hit the index url for the site to start tracking events**: `http://localhost:3000/index.html`.