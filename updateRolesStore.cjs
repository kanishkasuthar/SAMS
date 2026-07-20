const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace import
  content = content.replace(/import\s+\{\s*useOrgStore\s*\}\s+from\s+['"]([^'"]+)orgStore['"];/g, 
    "import { useOrgStore } from '$1orgStore';\nimport { useRoleStore } from '$1roleStore';");

  // In the component, if it destructured roles or allPermissions from useOrgStore, change it
  // This is a bit tricky with regex, let's just do targeted replaces for known patterns
  content = content.replace(/const\s+\{\s*(.*?roles.*?)\s*\}\s*=\s*useOrgStore\(\);/g, (match, p1) => {
    // If it only has roles and allPermissions
    if (p1.includes('people')) {
      // Need both stores
      return `const { people } = useOrgStore();\n  const { roles, permissions: allPermissions } = useRoleStore();`;
    }
    return `const { roles, permissions: allPermissions } = useRoleStore();`;
  });

  content = content.replace(/const\s+\{\s*roles\s*\}\s*=\s*useOrgStore\(\);/g, "const { roles } = useRoleStore();");
  content = content.replace(/const\s+\{\s*allPermissions\s*\}\s*=\s*useOrgStore\(\);/g, "const { permissions: allPermissions } = useRoleStore();");

  // Rename role.title to role.name
  content = content.replace(/role\.title/g, "role.name");

  // Update classification mappings where found
  content = content.replace(/role\.classification\s*===/g, "role.color ==="); // simplistic

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.jsx')) {
      replaceInFile(dirPath);
    }
  });
}

walkDir(path.join(__dirname, 'src/components/roles'));
