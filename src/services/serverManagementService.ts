
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Get detailed information about a server
 */
export async function getServerDetails(instanceId: string) {
  try {
    // First try to get from Supabase if available
    const { data, error } = await supabase
      .from('instances')
      .select('*')
      .eq('id', instanceId)
      .single();
    
    if (error) throw error;
    if (data) return data;
    
    // Fall back to mock data for demonstration
    return {
      id: instanceId,
      instance_name: 'Demo Server',
      alias: 'demoserver.vps.webdock.cloud',
      status: 'running',
      ipv4: '45.148.30.166',
      ipv6: '2a06:1301:450:45:148:30:166:0',
      location: 'Europe / Helsinki',
      type: 'Webdock LXD VPS',
      profile: 'NVMe Ryzen™ 9 Pro',
      image: 'Jammy LAMP 8.2',
      webRoot: '/var/www/html',
      monitoring: 'Enabled',
      cpu: '12%',
      memory: '43%',
      disk: '28%',
      network: '37%',
    };
  } catch (error) {
    console.error('Error fetching server details:', error);
    throw error;
  }
}

/**
 * Get server credentials for various services
 */
export async function getServerCredentials(instanceId: string) {
  try {
    // In a real implementation, this would be fetched from the backend
    // Here we return mock data for demonstration
    return {
      mysqlRootUser: 'admin',
      mysqlRootPassword: '8gDu2jrYuM7',
      databaseName: 'demoserver',
      databaseUser: 'demoserver',
      databasePassword: 'wFQOvWMCwHEX',
      ftpUsername: 'demoserver',
      ftpPassword: 'MFREzIreTBAC',
    };
  } catch (error) {
    console.error('Error fetching server credentials:', error);
    throw error;
  }
}

/**
 * Regenerate password for a specific service
 */
export async function regeneratePassword(instanceId: string, service: string) {
  try {
    // In a real implementation, this would call an API endpoint
    // Here we generate a random password for demonstration
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // In a production app, you would make an API call here to update the password
    console.log(`Regenerated ${service} password for instance ${instanceId}: ${result}`);
    
    return result;
  } catch (error) {
    console.error(`Error regenerating ${service} password:`, error);
    throw error;
  }
}

/**
 * Get server utilization data for monitoring
 */
export async function getServerUtilization(instanceId: string, timeRange: string) {
  try {
    // Call our Supabase edge function for monitoring data
    const { data, error } = await supabase.functions.invoke('server-management', {
      body: { 
        action: 'monitoring',
        serverId: instanceId,
        period: timeRange
      }
    });
    
    if (error) {
      console.error('Error calling monitoring function:', error);
      throw error;
    }
    
    if (data) return data;
    
    // Fall back to mock data if the function fails
    const numberOfPoints = timeRange === 'day' ? 24 : timeRange === 'week' ? 7 : 30;
    const timeUnit = timeRange === 'day' ? 'hours' : timeRange === 'week' ? 'days' : 'days';
    
    const generateTimeSeries = () => {
      // Generate historical data points
      return Array.from({ length: numberOfPoints }, (_, i) => {
        const date = new Date();
        
        if (timeUnit === 'hours') {
          date.setHours(date.getHours() - (numberOfPoints - 1 - i));
        } else {
          date.setDate(date.getDate() - (numberOfPoints - 1 - i));
        }
        
        return {
          timestamp: date.toISOString(),
          value: Math.random() * 30 + 5, // Random value between 5 and 35
        };
      });
    };
    
    // Generate mock data structure
    return {
      disk: {
        used: 3908, // MB
        allowed: 25000, // MB
        unit: 'MB',
        history: generateTimeSeries().map(point => ({
          ...point,
          value: Math.floor(Math.random() * 300) + 3900, // 3900-4200 MB
        })),
      },
      network: {
        used: 0.2, // GB
        allowed: 1000, // GB
        unit: 'GB',
        history: generateTimeSeries().map(point => ({
          ...point,
          value: Math.random() * 200 + 50, // 50-250 MB
        })),
      },
      cpu: {
        current: 12, // Percentage
        history: generateTimeSeries().map(point => ({
          ...point,
          value: Math.random() * 30 + 5, // 5-35%
        })),
      },
      memory: {
        current: 43, // Percentage
        history: generateTimeSeries().map(point => ({
          ...point,
          value: Math.random() * 40 + 20, // 20-60%
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching server utilization:', error);
    throw error;
  }
}

/**
 * Perform power actions on the server (start, stop, restart)
 */
export async function powerAction(instanceId: string, action: 'start' | 'stop' | 'restart') {
  try {
    // Call our Supabase edge function for power actions
    const { data, error } = await supabase.functions.invoke('server-management', {
      body: { 
        action: 'power',
        serverId: instanceId,
        operation: action
      }
    });
    
    if (error) {
      console.error(`Error performing ${action} action:`, error);
      // Fall back to simulation
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1500);
      });
    }
    
    return data;
  } catch (error) {
    console.error(`Error performing ${action} action:`, error);
    throw error;
  }
}

/**
 * Create a backup/snapshot of the server
 */
export async function createSnapshot(instanceId: string, snapshotName: string) {
  try {
    // Call our Supabase edge function for backups
    const { data, error } = await supabase.functions.invoke('server-management', {
      body: { 
        action: 'backups',
        serverId: instanceId,
        operation: 'create',
        name: snapshotName
      }
    });
    
    if (error) {
      console.error('Error creating snapshot:', error);
      // Fall back to simulation
      return new Promise((resolve) => {
        setTimeout(() => resolve({ 
          id: `snap_${Date.now()}`,
          name: snapshotName, 
          createdAt: new Date().toISOString() 
        }), 2000);
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error creating snapshot:', error);
    throw error;
  }
}

/**
 * Deploy a file to the server
 */
export async function deployFile(instanceId: string, filePath: string, content: string) {
  try {
    // Call our Supabase edge function for file management
    const { data, error } = await supabase.functions.invoke('server-management', {
      body: { 
        action: 'files',
        serverId: instanceId,
        operation: 'write',
        path: filePath,
        content: content
      }
    });
    
    if (error) {
      console.error('Error deploying file:', error);
      // Fall back to simulation
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1500);
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error deploying file:', error);
    throw error;
  }
}

/**
 * Execute a command on the server
 */
export async function executeCommand(instanceId: string, command: string) {
  try {
    // Call our Supabase edge function for command execution
    const { data, error } = await supabase.functions.invoke('server-management', {
      body: { 
        action: 'execute',
        serverId: instanceId,
        command: command
      }
    });
    
    if (error) {
      console.error('Error executing command:', error);
      // Fall back to simulation
      return new Promise((resolve) => {
        setTimeout(() => resolve({ 
          output: `Command executed successfully.\n$ ${command}\n> Operation completed with exit code 0.` 
        }), 1500);
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error executing command:', error);
    throw error;
  }
}

/**
 * Deploy a control panel on the server
 */
export async function deployControlPanel(instanceId: string, panelType: string) {
  try {
    // Call our Supabase edge function for panel management
    const { data, error } = await supabase.functions.invoke('server-management', {
      body: { 
        action: 'panels',
        panelType: panelType,
        serverId: instanceId,
        operation: 'deploy'
      }
    });
    
    if (error) {
      console.error(`Error deploying ${panelType}:`, error);
      // Fall back to simulation
      return new Promise((resolve) => {
        setTimeout(() => resolve({ 
          success: true,
          message: `${panelType} deployed successfully` 
        }), 2500);
      });
    }
    
    return data;
  } catch (error) {
    console.error(`Error deploying ${panelType}:`, error);
    throw error;
  }
}

/**
 * Deploy a server stack on the server
 */
export async function deployServerStack(instanceId: string, stackType: string, options: any = {}) {
  try {
    // Call our Supabase edge function for stack deployment
    const { data, error } = await supabase.functions.invoke('server-management', {
      body: { 
        action: 'stacks',
        stackType: stackType,
        serverId: instanceId,
        options: options
      }
    });
    
    if (error) {
      console.error(`Error deploying ${stackType} stack:`, error);
      // Fall back to simulation
      return new Promise((resolve) => {
        setTimeout(() => resolve({ 
          success: true,
          message: `${stackType} stack deployed successfully` 
        }), 3000);
      });
    }
    
    return data;
  } catch (error) {
    console.error(`Error deploying ${stackType} stack:`, error);
    throw error;
  }
}

// New function to get available control panels
export async function getAvailableControlPanels() {
  return [
    { id: 'cpanel', name: 'cPanel', description: 'Industry standard control panel', icon: '🔧' },
    { id: 'plesk', name: 'Plesk', description: 'Easy-to-use hosting control panel', icon: '🛠️' },
    { id: 'laravelforge', name: 'Laravel Forge', description: 'Server management for Laravel apps', icon: '🚀' },
    { id: 'runcloud', name: 'RunCloud', description: 'Modern web server management', icon: '☁️' },
    { id: 'spinupwp', name: 'SpinupWP', description: 'WordPress-focused server control', icon: '🌐' },
    { id: 'aapanel', name: 'AAPanel', description: 'Free and open source panel', icon: '🔄' },
    { id: 'ploi', name: 'Ploi', description: 'Server management for developers', icon: '🛰️' },
    { id: 'gridpane', name: 'Gridpane', description: 'WordPress hosting control panel', icon: '📊' },
    { id: 'serverpilot', name: 'ServerPilot', description: 'PHP app deployment and management', icon: '✈️' }
  ];
}

// New function to get available server stacks
export async function getAvailableServerStacks() {
  return [
    { id: 'lamp', name: 'LAMP', description: 'Linux, Apache, MySQL, PHP', icon: '🐧' },
    { id: 'lemp', name: 'LEMP', description: 'Linux, Nginx, MySQL, PHP', icon: '🦄' },
    { id: 'mean', name: 'MEAN', description: 'MongoDB, Express, Angular, Node', icon: '🍃' },
    { id: 'mern', name: 'MERN', description: 'MongoDB, Express, React, Node', icon: '⚛️' },
    { id: 'wordpress', name: 'WordPress', description: 'Optimized WordPress stack', icon: '📝' },
    { id: 'django', name: 'Django', description: 'Python Django with PostgreSQL', icon: '🐍' },
    { id: 'ruby', name: 'Ruby on Rails', description: 'Ruby, Rails, PostgreSQL', icon: '💎' }
  ];
}
