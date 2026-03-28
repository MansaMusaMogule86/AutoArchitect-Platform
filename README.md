
# AutoArchitect Platform

AI-driven project orchestration platform for UI, PRD, and Code.

## Web Interface
1. Open the landing page.
2. Enter your project description.
3. Click "Build Now" to run the 3-step pipeline.

## CLI Tool (studio)
The CLI shares the core logic with the web platform.

### Installation
```bash
npm install -g @autoarch/cli
```

### Usage
```bash
# Set your API Key
export API_KEY=your_key_here

# Generate a project
studio generate --name "DentistCRM" --description "A CRM for dentists with appointment scheduling" --output ./dentist-crm
```

### Flags
- `--name`: The name of your project.
- `--description`: A detailed prompt describing what to build.
- `--output`: The local directory where files will be saved.

## Architecture
- `core/`: Shared logic and versioned prompts.
- `cli/`: CLI entry point using Node.js.
- `App.tsx`: Next.js/React generator interface.
