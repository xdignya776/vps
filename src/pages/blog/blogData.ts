
interface ArticleContent {
  type: 'paragraph' | 'heading' | 'code' | 'list';
  content?: string;
  items?: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  featuredImage?: string;
  content: ArticleContent[];
}

// Documentation articles
export const blogArticles: BlogArticle[] = [
  // Getting Started Articles
  {
    id: '1',
    slug: 'creating-your-account',
    title: 'Creating Your Account',
    summary: 'How to set up your DG Servers account and get started',
    author: 'DG Servers Team',
    date: 'April 2, 2025',
    category: 'Getting Started',
    content: [
      {
        type: 'paragraph',
        content: 'Setting up your DG Servers account is quick and straightforward. This guide will walk you through the process step by step to get you up and running in no time.'
      },
      {
        type: 'heading',
        content: 'Step 1: Registration'
      },
      {
        type: 'paragraph',
        content: 'Visit our homepage and click the "Sign Up" button in the top right corner. You\'ll need to provide a valid email address, create a strong password, and agree to our terms of service.'
      },
      {
        type: 'heading',
        content: 'Step 2: Email Verification'
      },
      {
        type: 'paragraph',
        content: 'After submitting your registration form, check your email inbox for a verification link. Click on the link to verify your email address and activate your account.'
      },
      {
        type: 'heading',
        content: 'Step 3: Complete Your Profile'
      },
      {
        type: 'paragraph',
        content: 'Once your email is verified, you\'ll be prompted to complete your profile. Add your personal or business information, including your name, address, and phone number.'
      },
      {
        type: 'heading',
        content: 'Step 4: Set Up Billing Information'
      },
      {
        type: 'paragraph',
        content: 'To use our services, you\'ll need to add a payment method. We accept credit cards, PayPal, and various cryptocurrencies. Your payment information is securely stored and processed using industry-standard encryption.'
      },
      {
        type: 'heading',
        content: 'Step 5: Add SSH Keys (Optional)'
      },
      {
        type: 'paragraph',
        content: 'For enhanced security, we recommend adding SSH keys to your account. These allow for password-less authentication when connecting to your server.'
      },
      {
        type: 'code',
        content: '# Generate an SSH key pair\nssh-keygen -t rsa -b 4096 -C "your_email@example.com"'
      },
      {
        type: 'heading',
        content: 'Account Security Recommendations'
      },
      {
        type: 'list',
        items: [
          'Use a strong, unique password',
          'Enable two-factor authentication',
          'Regularly review account activity',
          'Keep contact information up-to-date',
          'Use SSH keys instead of password authentication when possible'
        ]
      },
      {
        type: 'paragraph',
        content: 'Following these steps will ensure your DG Servers account is properly set up and secure. If you encounter any issues during the registration process, our support team is available 24/7 to assist you.'
      }
    ]
  },
  {
    id: '2',
    slug: 'choosing-the-right-plan',
    title: 'Choosing the Right Plan',
    summary: 'How to select the optimal server configuration for your needs',
    author: 'Maria Papadopoulos',
    date: 'March 28, 2025',
    category: 'Getting Started',
    content: [
      {
        type: 'paragraph',
        content: 'Selecting the right server plan is crucial for your application\'s performance and your budget. This guide helps you understand our different offerings and how to choose the best fit for your specific needs.'
      },
      {
        type: 'heading',
        content: 'Understanding Your Requirements'
      },
      {
        type: 'paragraph',
        content: 'Before choosing a plan, assess your needs in terms of processing power, memory, storage, and bandwidth. Consider factors like the type of application you\'re running, expected traffic, and growth projections.'
      },
      {
        type: 'heading',
        content: 'VPS Plans Overview'
      },
      {
        type: 'paragraph',
        content: 'Our VPS plans range from entry-level to high-performance configurations. Each plan comes with dedicated resources, ensuring consistent performance regardless of other users on the physical server.'
      },
      {
        type: 'list',
        items: [
          'Starter: 1 vCPU, 2GB RAM, 20GB SSD - Ideal for small websites and development environments',
          'Business: 2 vCPU, 4GB RAM, 50GB SSD - Perfect for medium-sized websites and applications',
          'Professional: 4 vCPU, 8GB RAM, 100GB SSD - Suitable for high-traffic websites and databases',
          'Enterprise: 8 vCPU, 16GB RAM, 200GB SSD - Designed for resource-intensive applications'
        ]
      },
      {
        type: 'heading',
        content: 'Dedicated vs. VPS Hosting'
      },
      {
        type: 'paragraph',
        content: 'While VPS offers a balance of cost and performance, dedicated servers provide the highest level of performance, security, and customization. Consider dedicated hosting if you have specific compliance requirements or need maximum performance.'
      },
      {
        type: 'heading',
        content: 'Managed vs. Unmanaged Hosting'
      },
      {
        type: 'paragraph',
        content: 'Managed hosting includes server maintenance, updates, and support, ideal if you don\'t have technical expertise. Unmanaged hosting gives you complete control but requires you to handle all administration tasks.'
      },
      {
        type: 'heading',
        content: 'Scaling Considerations'
      },
      {
        type: 'paragraph',
        content: 'Choose a plan that accommodates your current needs but also consider future growth. Our platform allows easy upgrades with minimal downtime, so you can start with a smaller plan and scale up as needed.'
      },
      {
        type: 'paragraph',
        content: 'With these considerations in mind, you should be able to select the right plan for your needs. Remember, our team is always available to provide recommendations based on your specific requirements.'
      }
    ]
  },
  {
    id: '3',
    slug: 'deploying-your-first-vps',
    title: 'Deploying Your First VPS',
    summary: 'Step-by-step guide to launching your first virtual server',
    author: 'Andreas Nikolaou',
    date: 'March 25, 2025',
    category: 'Getting Started',
    content: [
      {
        type: 'paragraph',
        content: 'Deploying your first VPS might seem daunting, but our streamlined process makes it simple. This guide will walk you through each step from selecting an operating system to connecting to your server for the first time.'
      },
      {
        type: 'heading',
        content: 'Step 1: Choose Your Plan'
      },
      {
        type: 'paragraph',
        content: 'After logging in to your account dashboard, click on "Deploy New VPS" and select the plan that matches your requirements. Review the specifications to ensure they meet your needs.'
      },
      {
        type: 'heading',
        content: 'Step 2: Select Operating System'
      },
      {
        type: 'paragraph',
        content: 'We offer various operating systems including Ubuntu, Debian, CentOS, and Windows Server. Choose the one you\'re most comfortable with or that best supports your application stack.'
      },
      {
        type: 'heading',
        content: 'Step 3: Choose Location'
      },
      {
        type: 'paragraph',
        content: 'Select a data center location closest to your target audience to minimize latency. We have multiple data centers across Europe to ensure optimal performance.'
      },
      {
        type: 'heading',
        content: 'Step 4: Configure Authentication'
      },
      {
        type: 'paragraph',
        content: 'For Linux servers, you can choose between password authentication or SSH key authentication (recommended). For Windows servers, a random administrator password will be generated.'
      },
      {
        type: 'code',
        content: '# If using SSH keys, make sure to add your public key to your account\ncat ~/.ssh/id_rsa.pub'
      },
      {
        type: 'heading',
        content: 'Step 5: Additional Options'
      },
      {
        type: 'paragraph',
        content: 'Configure additional options like hostname, automated backups, and add-on services. These can be modified later if needed.'
      },
      {
        type: 'heading',
        content: 'Step 6: Review and Deploy'
      },
      {
        type: 'paragraph',
        content: 'Review your configuration and complete the payment process. Deployment typically takes 2-5 minutes, after which you\'ll receive server access details via email.'
      },
      {
        type: 'heading',
        content: 'Step 7: Connect to Your Server'
      },
      {
        type: 'paragraph',
        content: 'For Linux servers, use SSH to connect. For Windows, use Remote Desktop Protocol (RDP).'
      },
      {
        type: 'code',
        content: '# Connect to Linux server via SSH\nssh root@your_server_ip\n\n# For Windows, use the RDP client with the provided IP and credentials'
      },
      {
        type: 'heading',
        content: 'Initial Security Recommendations'
      },
      {
        type: 'list',
        items: [
          'Update system packages immediately',
          'Create a non-root user for daily operations',
          'Configure firewall rules',
          'Change default SSH port (for Linux servers)',
          'Install security updates automatically'
        ]
      },
      {
        type: 'paragraph',
        content: 'Congratulations! Your VPS is now deployed and ready for use. If you encounter any issues during the deployment process, our support team is available 24/7 to assist you.'
      }
    ]
  },
  
  // Server Management Articles
  {
    id: '4',
    slug: 'using-the-control-panel',
    title: 'Using the Control Panel',
    summary: 'Master our intuitive control panel for server management',
    author: 'Dimitris Georgiou',
    date: 'March 20, 2025',
    category: 'Server Management',
    content: [
      {
        type: 'paragraph',
        content: 'Our control panel is designed to make server management simple and intuitive. This guide covers all the features and functionalities to help you efficiently manage your VPS.'
      },
      {
        type: 'heading',
        content: 'Dashboard Overview'
      },
      {
        type: 'paragraph',
        content: 'Upon logging in, you\'ll see your dashboard displaying all your active services, server status, resource usage, and recent activity. This gives you a quick overview of your infrastructure.'
      },
      {
        type: 'heading',
        content: 'Server Management'
      },
      {
        type: 'paragraph',
        content: 'Click on any server in your dashboard to access its management page. Here you can view detailed server information, monitor resource usage, and access various management tools.'
      },
      {
        type: 'heading',
        content: 'Power Controls'
      },
      {
        type: 'paragraph',
        content: 'The power controls allow you to start, stop, restart, or force shutdown your server. Use these options carefully, especially the force shutdown which should only be used when the server is unresponsive.'
      },
      {
        type: 'heading',
        content: 'Console Access'
      },
      {
        type: 'paragraph',
        content: 'The web-based console provides direct access to your server\'s command line interface without requiring SSH. This is particularly useful for emergency access or if you\'re behind a restrictive firewall.'
      },
      {
        type: 'heading',
        content: 'Backup Management'
      },
      {
        type: 'paragraph',
        content: 'Configure automated backups or create manual snapshots from the Backups tab. You can schedule backups, manage retention policies, and restore from previous backups when needed.'
      },
      {
        type: 'heading',
        content: 'Network Settings'
      },
      {
        type: 'paragraph',
        content: 'Manage IP addresses, configure reverse DNS, and monitor bandwidth usage from the Network tab. You can also set up firewall rules and manage network interfaces.'
      },
      {
        type: 'heading',
        content: 'Monitoring Tools'
      },
      {
        type: 'paragraph',
        content: 'The monitoring section provides real-time and historical data on CPU usage, memory consumption, disk I/O, and network traffic. Set up alerts to be notified when certain thresholds are exceeded.'
      },
      {
        type: 'heading',
        content: 'User Management'
      },
      {
        type: 'paragraph',
        content: 'Create additional users with different permission levels to allow team members access to server management features without sharing your main account credentials.'
      },
      {
        type: 'paragraph',
        content: 'Mastering our control panel will allow you to efficiently manage your servers and make the most of our platform\'s features. If you need any assistance, our support team is available through the built-in ticketing system.'
      }
    ]
  },
  {
    id: '5',
    slug: 'rebooting-power-options',
    title: 'Rebooting & Power Options',
    summary: 'Understanding server power management and safe reboot procedures',
    author: 'Maria Papadopoulos',
    date: 'March 15, 2025',
    category: 'Server Management',
    content: [
      {
        type: 'paragraph',
        content: 'Proper management of your server\'s power state is crucial for maintaining system health and minimizing downtime. This guide explains the various power options and when to use them.'
      },
      {
        type: 'heading',
        content: 'Understanding Power States'
      },
      {
        type: 'paragraph',
        content: 'Your VPS can be in one of several power states: running, stopped, or restarting. Each state has implications for billing, accessibility, and data integrity.'
      },
      {
        type: 'heading',
        content: 'Soft Reboot vs. Hard Reboot'
      },
      {
        type: 'paragraph',
        content: 'A soft reboot sends a signal to the operating system to restart gracefully, allowing services to shut down properly. A hard reboot is equivalent to pulling the power plug and should only be used when the system is unresponsive.'
      },
      {
        type: 'code',
        content: '# To perform a soft reboot on Linux via SSH\nsudo reboot\n\n# Or through our control panel:\n# Navigate to Server > Power Options > Reboot'
      },
      {
        type: 'heading',
        content: 'When to Reboot Your Server'
      },
      {
        type: 'list',
        items: [
          'After installing system updates that require a restart',
          'When changing certain hardware configurations',
          'To resolve memory leaks or performance issues',
          'After making significant changes to system configuration'
        ]
      },
      {
        type: 'heading',
        content: 'Scheduling Reboots'
      },
      {
        type: 'paragraph',
        content: 'For mission-critical services, schedule reboots during low-traffic periods. Our control panel allows you to schedule one-time or recurring reboots at specific times.'
      },
      {
        type: 'heading',
        content: 'Power Off Procedure'
      },
      {
        type: 'paragraph',
        content: 'When you need to stop your server completely, always use a graceful shutdown rather than a forced power off. This allows the operating system to close files and stop services properly, preventing potential data corruption.'
      },
      {
        type: 'code',
        content: '# To shut down a Linux server via SSH\nsudo shutdown -h now\n\n# Or through our control panel:\n# Navigate to Server > Power Options > Power Off'
      },
      {
        type: 'heading',
        content: 'Handling Unresponsive Servers'
      },
      {
        type: 'paragraph',
        content: 'If your server becomes unresponsive to normal reboot commands, use the emergency power options in the control panel. The forced reboot option should be your last resort as it may cause data loss or filesystem corruption.'
      },
      {
        type: 'heading',
        content: 'Power Cycle vs. Reset'
      },
      {
        type: 'paragraph',
        content: 'A power cycle completely turns off the virtual machine and starts it again, similar to unplugging and plugging in a physical server. A reset is more abrupt and skips some shutdown processes.'
      },
      {
        type: 'paragraph',
        content: 'Understanding these power options helps you maintain server stability and respond appropriately to different situations. Always prioritize data integrity by using graceful shutdowns and reboots when possible.'
      }
    ]
  },
  {
    id: '6',
    slug: 'backup-restore',
    title: 'Backup & Restore',
    summary: 'Implementing effective backup strategies and recovery procedures',
    author: 'Andreas Nikolaou',
    date: 'March 10, 2025',
    category: 'Server Management',
    content: [
      {
        type: 'paragraph',
        content: 'Regular backups are essential for data protection and business continuity. This guide covers backup strategies, configuration options, and restoration procedures for your VPS.'
      },
      {
        type: 'heading',
        content: 'Backup Types'
      },
      {
        type: 'paragraph',
        content: 'Our platform offers two primary backup types: automated system backups and manual snapshots. Each serves different purposes and provides different levels of protection.'
      },
      {
        type: 'heading',
        content: 'Automated System Backups'
      },
      {
        type: 'paragraph',
        content: 'System backups run automatically according to your configured schedule. They capture the entire system state, including the operating system, applications, and data. These backups are incremental after the initial full backup, minimizing storage requirements.'
      },
      {
        type: 'code',
        content: '# To configure automated backups:\n# Navigate to Server > Backups > Schedule\n# Select frequency: Daily, Weekly, or Monthly\n# Choose retention period (how long backups are kept)\n# Select backup window (time when backups run)'
      },
      {
        type: 'heading',
        content: 'Manual Snapshots'
      },
      {
        type: 'paragraph',
        content: 'Snapshots are point-in-time images of your server that you create manually, typically before making significant changes. These are useful for testing updates or configurations with the ability to quickly revert if needed.'
      },
      {
        type: 'heading',
        content: 'Backup Storage Considerations'
      },
      {
        type: 'paragraph',
        content: 'Backups consume storage space based on the data size and retention policy. Monitor your backup storage usage to avoid unexpected charges and adjust retention policies as needed.'
      },
      {
        type: 'heading',
        content: 'Restoring from Backups'
      },
      {
        type: 'paragraph',
        content: 'There are several restoration options available, depending on your needs:'
      },
      {
        type: 'list',
        items: [
          'Full system restore: Replaces the entire VPS with the backup version',
          'Selective file restore: Recovers specific files or directories',
          'Create new instance: Deploys a new VPS based on the backup',
          'Mount backup: Access backup contents without overwriting current data'
        ]
      },
      {
        type: 'heading',
        content: 'Restoration Process'
      },
      {
        type: 'paragraph',
        content: 'To restore from a backup, navigate to the Backups section in your control panel, select the desired backup point, and choose your preferred restoration method. The process typically takes a few minutes, depending on the data size.'
      },
      {
        type: 'heading',
        content: 'Best Practices'
      },
      {
        type: 'list',
        items: [
          'Test backups regularly to ensure they can be successfully restored',
          'Implement off-site backups for critical data',
          'Document backup and restoration procedures',
          'Create manual snapshots before major system changes',
          'Monitor backup job status and investigate failed backups'
        ]
      },
      {
        type: 'paragraph',
        content: 'A robust backup strategy is your insurance policy against data loss, system failures, and security incidents. Take the time to configure and test your backup solution properly to ensure peace of mind and business continuity.'
      }
    ]
  },
  
  // Additional blog articles for other categories with similar structure
  // Security Guide Articles
  {
    id: '7',
    slug: 'ssh-keys-security',
    title: 'SSH Keys & Security',
    summary: 'Learn how to use SSH keys to enhance server security',
    author: 'Dimitris Georgiou',
    date: 'March 5, 2025',
    category: 'Security Guide',
    content: [
      {
        type: 'paragraph',
        content: 'SSH keys provide a more secure authentication method than passwords. This guide explains how to generate, configure, and manage SSH keys to enhance your server\'s security.'
      },
      {
        type: 'heading',
        content: 'Understanding SSH Key Authentication'
      },
      {
        type: 'paragraph',
        content: 'SSH key authentication uses a pair of cryptographic keys: a private key (kept secret on your computer) and a public key (placed on the server). This method eliminates password-based attacks and provides stronger security.'
      },
      {
        type: 'heading',
        content: 'Generating SSH Key Pairs'
      },
      {
        type: 'code',
        content: '# Generate an SSH key pair on Linux or macOS\nssh-keygen -t ed25519 -C "your_email@example.com"\n\n# For older systems that don\'t support Ed25519\nssh-keygen -t rsa -b 4096 -C "your_email@example.com"'
      },
      {
        type: 'paragraph',
        content: 'When prompted, you can specify a custom filename or accept the default. We strongly recommend setting a passphrase for additional security.'
      },
      {
        type: 'heading',
        content: 'Adding SSH Keys to Your Account'
      },
      {
        type: 'paragraph',
        content: 'In your DG Servers account, navigate to Security → SSH Keys. Click "Add SSH Key", provide a name for the key, and paste the content of your public key file (.pub).'
      },
      {
        type: 'code',
        content: '# View your public key\ncat ~/.ssh/id_ed25519.pub'
      },
      {
        type: 'heading',
        content: 'Deploying SSH Keys to Existing Servers'
      },
      {
        type: 'paragraph',
        content: 'For existing servers, you can add SSH keys through the control panel or manually by adding them to the ~/.ssh/authorized_keys file on your server.'
      },
      {
        type: 'code',
        content: '# Manual method to add keys to a server\nmkdir -p ~/.ssh\nchmod 700 ~/.ssh\necho "your_public_key_content" >> ~/.ssh/authorized_keys\nchmod 600 ~/.ssh/authorized_keys'
      },
      {
        type: 'heading',
        content: 'Disabling Password Authentication'
      },
      {
        type: 'paragraph',
        content: 'After successfully testing SSH key authentication, consider disabling password authentication entirely to enhance security.'
      },
      {
        type: 'code',
        content: '# Edit SSH configuration\nsudo nano /etc/ssh/sshd_config\n\n# Set these options\nPasswordAuthentication no\nChallengeResponseAuthentication no\nUsePAM no\n\n# Restart SSH service\nsudo systemctl restart sshd'
      },
      {
        type: 'heading',
        content: 'Managing Multiple SSH Keys'
      },
      {
        type: 'paragraph',
        content: 'If you manage multiple servers or have different keys for different purposes, use an SSH config file to organize your connections.'
      },
      {
        type: 'code',
        content: '# Create or edit ~/.ssh/config\nHost production\n    HostName 123.45.67.89\n    User admin\n    IdentityFile ~/.ssh/prod_key\n\nHost staging\n    HostName 98.76.54.32\n    User admin\n    IdentityFile ~/.ssh/staging_key'
      },
      {
        type: 'heading',
        content: 'SSH Key Security Best Practices'
      },
      {
        type: 'list',
        items: [
          'Never share your private key',
          'Use a strong passphrase for your private key',
          'Consider using a different key pair for each server or service',
          'Regularly rotate SSH keys, especially for critical infrastructure',
          'Back up your private keys securely',
          'Use ssh-agent to avoid typing your passphrase repeatedly'
        ]
      },
      {
        type: 'paragraph',
        content: 'Implementing SSH key authentication significantly improves your server\'s security posture. Take the time to properly configure and manage your SSH keys to protect your infrastructure from unauthorized access.'
      }
    ]
  },
  {
    id: '8',
    slug: 'firewall-configuration',
    title: 'Firewall Configuration',
    summary: 'Secure your server with proper firewall rules',
    author: 'Maria Papadopoulos',
    date: 'February 28, 2025',
    category: 'Security Guide',
    content: [
      {
        type: 'paragraph',
        content: 'A properly configured firewall is your first line of defense against unauthorized access and attacks. This guide covers firewall configuration best practices for your VPS.'
      },
      {
        type: 'heading',
        content: 'Understanding Firewalls'
      },
      {
        type: 'paragraph',
        content: 'A firewall controls incoming and outgoing network traffic based on predetermined security rules. Our platform offers both network-level firewalls and host-based firewalls for comprehensive protection.'
      },
      {
        type: 'heading',
        content: 'Network Firewall'
      },
      {
        type: 'paragraph',
        content: 'Our network firewall operates at the infrastructure level, filtering traffic before it reaches your server. You can configure these rules from your control panel under Server → Networking → Firewall.'
      },
      {
        type: 'heading',
        content: 'Host-Based Firewall (UFW)'
      },
      {
        type: 'paragraph',
        content: 'For Ubuntu and Debian servers, we recommend using UFW (Uncomplicated Firewall) for host-level protection. Here\'s how to set it up:'
      },
      {
        type: 'code',
        content: '# Install UFW if not already installed\nsudo apt update\nsudo apt install ufw\n\n# Set default policies\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# Allow SSH (important to prevent lockout)\nsudo ufw allow ssh\n\n# Allow web traffic if needed\nsudo ufw allow http\nsudo ufw allow https\n\n# Enable the firewall\nsudo ufw enable'
      },
      {
        type: 'heading',
        content: 'Host-Based Firewall (firewalld)'
      },
      {
        type: 'paragraph',
        content: 'For CentOS and RHEL-based systems, firewalld is the recommended firewall management tool:'
      },
      {
        type: 'code',
        content: '# Check status\nsudo systemctl status firewalld\n\n# List allowed services\nsudo firewall-cmd --list-services\n\n# Allow services\nsudo firewall-cmd --permanent --add-service=http\nsudo firewall-cmd --permanent --add-service=https\n\n# Reload to apply changes\nsudo firewall-cmd --reload'
      },
      {
        type: 'heading',
        content: 'Implementing a Defense-in-Depth Strategy'
      },
      {
        type: 'paragraph',
        content: 'For maximum security, use both network and host-based firewalls. The network firewall provides broad protection, while the host firewall gives you fine-grained control over traffic.'
      },
      {
        type: 'heading',
        content: 'Allowing Specific IP Addresses'
      },
      {
        type: 'paragraph',
        content: 'For services like SSH or database access, consider restricting access to specific IP addresses.'
      },
      {
        type: 'code',
        content: '# Allow SSH access only from specific IP\nsudo ufw allow from 203.0.113.4 to any port 22\n\n# Allow database access from specific IP\nsudo ufw allow from 203.0.113.5 to any port 3306'
      },
      {
        type: 'heading',
        content: 'Monitoring Firewall Logs'
      },
      {
        type: 'paragraph',
        content: 'Regularly review your firewall logs to identify potential attacks or misconfigured rules. For UFW, logs are typically found at /var/log/ufw.log.'
      },
      {
        type: 'heading',
        content: 'Firewall Best Practices'
      },
      {
        type: 'list',
        items: [
          'Follow the principle of least privilege - only open ports that are absolutely necessary',
          'Always allow SSH access before enabling the firewall to prevent lockouts',
          'Test firewall configurations after changes',
          'Use rate limiting for services like SSH to prevent brute force attacks',
          'Document all firewall rules and their purpose',
          'Regularly audit and update your firewall configurations'
        ]
      },
      {
        type: 'paragraph',
        content: 'A well-configured firewall significantly reduces your server\'s attack surface. Take the time to implement proper firewall rules and regularly review your security posture to protect against evolving threats.'
      }
    ]
  },
  {
    id: '9',
    slug: 'keeping-your-server-updated',
    title: 'Keeping Your Server Updated',
    summary: 'Best practices for system updates and patch management',
    author: 'Andreas Nikolaou',
    date: 'February 25, 2025',
    category: 'Security Guide',
    content: [
      {
        type: 'paragraph',
        content: 'Keeping your server updated with the latest security patches is critical for maintaining a secure environment. This guide covers best practices for managing updates across different operating systems.'
      },
      {
        type: 'heading',
        content: 'Understanding Update Types'
      },
      {
        type: 'paragraph',
        content: 'Server updates generally fall into three categories: security updates (addressing vulnerabilities), bug fixes (resolving issues), and feature updates (adding new functionality). Security updates should always be prioritized.'
      },
      {
        type: 'heading',
        content: 'Updating Ubuntu/Debian Systems'
      },
      {
        type: 'code',
        content: '# Update package lists\nsudo apt update\n\n# Install security updates only\nsudo apt upgrade -s | grep -i security\nsudo apt upgrade\n\n# Full system upgrade (including new versions)\nsudo apt full-upgrade'
      },
      {
        type: 'heading',
        content: 'Updating CentOS/RHEL Systems'
      },
      {
        type: 'code',
        content: '# Update all packages\nsudo dnf update\n\n# Install security updates only\nsudo dnf update --security\n\n# Check available updates without installing\nsudo dnf check-update'
      },
      {
        type: 'heading',
        content: 'Automating Updates'
      },
      {
        type: 'paragraph',
        content: 'For critical security patches, consider enabling automatic updates. On Ubuntu/Debian, you can use the unattended-upgrades package:'
      },
      {
        type: 'code',
        content: '# Install unattended-upgrades\nsudo apt install unattended-upgrades apt-listchanges\n\n# Enable and configure\nsudo dpkg-reconfigure -plow unattended-upgrades'
      },
      {
        type: 'paragraph',
        content: 'For CentOS/RHEL, you can use dnf-automatic:'
      },
      {
        type: 'code',
        content: '# Install dnf-automatic\nsudo dnf install dnf-automatic\n\n# Configure for security updates only\nsudo sed -i \'s/apply_updates = no/apply_updates = yes/\' /etc/dnf/automatic.conf\n\n# Enable and start the service\nsudo systemctl enable --now dnf-automatic.timer'
      },
      {
        type: 'heading',
        content: 'Kernel Updates'
      },
      {
        type: 'paragraph',
        content: 'Kernel updates require special attention as they typically require a system reboot. Plan kernel updates during maintenance windows to minimize disruption.'
      },
      {
        type: 'code',
        content: '# Check current kernel version\nuname -r\n\n# Show installed kernels\ndpkg --list | grep linux-image\n\n# Remove old kernels (Ubuntu/Debian)\nsudo apt autoremove'
      },
      {
        type: 'heading',
        content: 'Testing Updates in Non-Production'
      },
      {
        type: 'paragraph',
        content: 'For critical systems, test updates in a staging environment before applying them to production. This helps identify potential issues before they affect your live services.'
      },
      {
        type: 'heading',
        content: 'Creating Pre-Update Snapshots'
      },
      {
        type: 'paragraph',
        content: 'Before applying major updates, create a server snapshot through your control panel. This provides a rollback option if something goes wrong during the update process.'
      },
      {
        type: 'heading',
        content: 'Update Management Best Practices'
      },
      {
        type: 'list',
        items: [
          'Establish a regular update schedule (e.g., weekly for security updates)',
          'Document all updates applied to your systems',
          'Subscribe to security bulletins for your operating system',
          'Prioritize updates based on criticality and relevance',
          'Test updates in non-production environments when possible',
          'Monitor systems after updating to catch any issues early',
          'Keep application dependencies and libraries updated, not just the OS'
        ]
      },
      {
        type: 'paragraph',
        content: 'A proactive approach to server updates is essential for maintaining security and stability. By implementing these practices, you\'ll reduce your vulnerability to known exploits while ensuring system reliability.'
      }
    ]
  },
  
  // Database Setup Articles
  {
    id: '10',
    slug: 'mysql-mariadb-setup',
    title: 'MySQL/MariaDB Setup',
    summary: 'Complete guide to setting up and optimizing MySQL databases',
    author: 'Dimitris Georgiou',
    date: 'February 20, 2025',
    category: 'Database Setup',
    content: [
      {
        type: 'paragraph',
        content: 'MySQL and MariaDB are popular relational database management systems that power countless web applications. This guide covers installation, configuration, and optimization for optimal performance.'
      },
      {
        type: 'heading',
        content: 'Installation'
      },
      {
        type: 'paragraph',
        content: 'On Ubuntu/Debian systems, you can install MySQL or MariaDB using apt:'
      },
      {
        type: 'code',
        content: '# For MySQL\nsudo apt update\nsudo apt install mysql-server\n\n# For MariaDB\nsudo apt update\nsudo apt install mariadb-server'
      },
      {
        type: 'paragraph',
        content: 'On CentOS/RHEL systems:'
      },
      {
        type: 'code',
        content: '# For MySQL\nsudo dnf install mysql-server\nsudo systemctl enable --now mysqld\n\n# For MariaDB\nsudo dnf install mariadb-server\nsudo systemctl enable --now mariadb'
      },
      {
        type: 'heading',
        content: 'Secure Installation'
      },
      {
        type: 'paragraph',
        content: 'After installation, run the security script to set a root password, remove anonymous users, and disable remote root login:'
      },
      {
        type: 'code',
        content: '# For MySQL\nsudo mysql_secure_installation\n\n# For MariaDB\nsudo mariadb-secure-installation'
      },
      {
        type: 'heading',
        content: 'Creating Databases and Users'
      },
      {
        type: 'code',
        content: '# Log in to MySQL/MariaDB\nmysql -u root -p\n\n# Create a new database\nCREATE DATABASE myapp;\n\n# Create a new user\nCREATE USER \'myappuser\'@\'localhost\' IDENTIFIED BY \'strong_password\';\n\n# Grant privileges\nGRANT ALL PRIVILEGES ON myapp.* TO \'myappuser\'@\'localhost\';\nFLUSH PRIVILEGES;\n\n# Exit\nEXIT;'
      },
      {
        type: 'heading',
        content: 'Basic Configuration'
      },
      {
        type: 'paragraph',
        content: 'The main configuration file is located at /etc/mysql/my.cnf or /etc/my.cnf. Here are some common settings to adjust:'
      },
      {
        type: 'code',
        content: '# Example my.cnf configuration\n[mysqld]\n# Memory settings\ninnodb_buffer_pool_size = 1G  # Adjust based on available RAM\ninnodb_log_file_size = 256M\n\n# Performance settings\ninnodb_flush_method = O_DIRECT\ninnodb_flush_log_at_trx_commit = 1  # For ACID compliance\n\n# Connection settings\nmax_connections = 200\n\n# Character set\ncharacter-set-server = utf8mb4\ncollation-server = utf8mb4_unicode_ci'
      },
      {
        type: 'heading',
        content: 'Performance Optimization'
      },
      {
        type: 'paragraph',
        content: 'Database performance depends on proper configuration based on your workload and available resources:'
      },
      {
        type: 'list',
        items: [
          'innodb_buffer_pool_size: Set to 70-80% of available RAM for database-dedicated servers',
          'innodb_log_file_size: Typically 25% of buffer pool size',
          'max_connections: Adjust based on expected concurrent connections',
          'tmp_table_size and max_heap_table_size: Increase for workloads with complex queries',
          'query_cache_size: Consider disabling on high-write workloads (set to 0)'
        ]
      },
      {
        type: 'heading',
        content: 'Enabling Remote Access'
      },
      {
        type: 'paragraph',
        content: 'By default, MySQL/MariaDB only allows connections from localhost. To enable remote access:'
      },
      {
        type: 'code',
        content: '# Edit the configuration file\nsudo nano /etc/mysql/mysql.conf.d/mysqld.cnf\n\n# Change bind-address from 127.0.0.1 to 0.0.0.0\n# Or comment it out: # bind-address = 127.0.0.1\n\n# Restart the service\nsudo systemctl restart mysql'
      },
      {
        type: 'paragraph',
        content: 'Then create a user with remote access permissions:'
      },
      {
        type: 'code',
        content: 'CREATE USER \'remoteuser\'@\'%\' IDENTIFIED BY \'strong_password\';\nGRANT ALL PRIVILEGES ON database_name.* TO \'remoteuser\'@\'%\';\nFLUSH PRIVILEGES;'
      },
      {
        type: 'heading',
        content: 'Backup Strategies'
      },
      {
        type: 'paragraph',
        content: 'Regular backups are essential for data protection. Use mysqldump for logical backups:'
      },
      {
        type: 'code',
        content: '# Backup all databases\nmysqldump --all-databases -u root -p > full_backup_$(date +%Y%m%d).sql\n\n# Backup specific database\nmysqldump -u root -p database_name > database_backup.sql\n\n# Compressed backup\nmysqldump -u root -p database_name | gzip > database_backup.sql.gz'
      },
      {
        type: 'paragraph',
        content: 'Consider setting up automated backups using cron jobs and implementing a backup rotation policy.'
      },
      {
        type: 'paragraph',
        content: 'With these setup and optimization steps, your MySQL or MariaDB database should be ready for production use. Monitor performance regularly and adjust configurations as your workload evolves.'
      }
    ]
  },
  
  // Command Line Guide Articles
  {
    id: '11',
    slug: 'basic-linux-commands',
    title: 'Basic Linux Commands',
    summary: 'Essential commands for managing your Linux VPS',
    author: 'Maria Papadopoulos',
    date: 'February 15, 2025',
    category: 'Command Line Guide',
    content: [
      {
        type: 'paragraph',
        content: 'Mastering basic Linux commands is essential for effectively managing your VPS. This guide covers the most important commands for navigating, managing files, and monitoring your server.'
      },
      {
        type: 'heading',
        content: 'Navigation Commands'
      },
      {
        type: 'code',
        content: '# Print working directory\npwd\n\n# List files and directories\nls\nls -l    # Detailed list\nls -la   # Include hidden files\n\n# Change directory\ncd /path/to/directory\ncd ~     # Home directory\ncd ..    # Parent directory\ncd -     # Previous directory'
      },
      {
        type: 'heading',
        content: 'File Operations'
      },
      {
        type: 'code',
        content: '# Create a file\ntouch filename.txt\n\n# Create a directory\nmkdir directory_name\nmkdir -p parent/child/grandchild  # Create parent directories as needed\n\n# Copy files\ncp source.txt destination.txt\ncp -r source_dir destination_dir  # Copy directories recursively\n\n# Move/rename files\nmv old_name.txt new_name.txt\nmv file.txt /path/to/destination/\n\n# Remove files and directories\nrm filename.txt\nrm -r directory  # Remove directory and contents\nrm -f filename   # Force removal without confirmation'
      },
      {
        type: 'heading',
        content: 'Viewing File Content'
      },
      {
        type: 'code',
        content: '# View entire file\ncat filename.txt\n\n# View file with pagination\nless filename.txt\n  # Press q to quit\n  # Press / to search\n  # Press n for next search result\n\n# View beginning of file\nhead filename.txt\nhead -n 20 filename.txt  # First 20 lines\n\n# View end of file\ntail filename.txt\ntail -n 20 filename.txt   # Last 20 lines\ntail -f logfile.log       # Follow file updates in real-time'
      },
      {
        type: 'heading',
        content: 'Text Searching'
      },
      {
        type: 'code',
        content: '# Search within files\ngrep "search_term" filename.txt\ngrep -i "case insensitive" filename.txt  # Ignore case\ngrep -r "search_term" /directory       # Recursive search\n\n# Find files\nfind /path -name "filename.txt"\nfind / -type f -name "*.log"           # Find all log files\nfind / -type d -name "*config*"       # Find directories with "config" in name\nfind /var/log -mtime -7               # Files modified in last 7 days'
      },
      {
        type: 'heading',
        content: 'System Information'
      },
      {
        type: 'code',
        content: '# System and kernel information\nuname -a\n\n# Disk space usage\ndf -h\n\n# Directory size\ndu -sh /path/to/directory\n\n# Memory usage\nfree -m\n\n# CPU information\ncat /proc/cpuinfo\n\n# Current processes\nps aux\ntop       # Interactive process viewer\nhtop      # Enhanced version of top (may need installation)'
      },
      {
        type: 'heading',
        content: 'User Management'
      },
      {
        type: 'code',
        content: '# Current user\nwhoami\n\n# User information\nid username\n\n# Add a new user\nsudo adduser username\n\n# Add user to group\nsudo usermod -aG groupname username\n\n# Switch user\nsu - username\n\n# Change password\npasswd         # Change your password\nsudo passwd username  # Change another user\'s password'
      },
      {
        type: 'heading',
        content: 'File Permissions'
      },
      {
        type: 'code',
        content: '# Change file mode/permissions\nchmod 755 file.txt   # rwxr-xr-x\nchmod +x script.sh    # Make executable\nchmod -R 644 directory  # Recursively change permissions\n\n# Change file owner\nchown user:group file.txt\nchown -R user:group directory  # Recursively change ownership'
      },
      {
        type: 'heading',
        content: 'Network Commands'
      },
      {
        type: 'code',
        content: '# Show network interfaces\nip addr\nifconfig    # Older systems\n\n# Test connectivity\nping example.com\n\n# Show network connections\nnetstat -tuln\nss -tuln    # Modern alternative\n\n# DNS lookup\nnslookup domain.com\ndig domain.com'
      },
      {
        type: 'heading',
        content: 'Command Chaining'
      },
      {
        type: 'paragraph',
        content: 'You can chain commands for more efficiency:'
      },
      {
        type: 'code',
        content: '# Execute second command only if first succeeds\ncommand1 && command2\n\n# Execute second command regardless of first\'s success\ncommand1 ; command2\n\n# Pipe output of first command to second\ncommand1 | command2\n\n# Example: Find and kill a process\nps aux | grep nginx | grep -v grep | awk \'{print $2}\' | xargs kill'
      },
      {
        type: 'paragraph',
        content: 'Mastering these basic commands will give you a solid foundation for managing your Linux server. As you become more comfortable, you can explore more advanced commands and scripting to automate routine tasks.'
      }
    ]
  },
  
  // Web Server Setup Articles
  {
    id: '12',
    slug: 'nginx-configuration',
    title: 'NGINX Configuration',
    summary: 'Setting up and optimizing NGINX for your web applications',
    author: 'Andreas Nikolaou',
    date: 'February 10, 2025',
    category: 'Web Server Setup',
    content: [
      {
        type: 'paragraph',
        content: 'NGINX is a high-performance web server, reverse proxy, and load balancer. This guide covers installation, basic configuration, and performance optimization for serving web applications.'
      },
      {
        type: 'heading',
        content: 'Installation'
      },
      {
        type: 'paragraph',
        content: 'Installing NGINX is straightforward on most Linux distributions:'
      },
      {
        type: 'code',
        content: '# Ubuntu/Debian\nsudo apt update\nsudo apt install nginx\n\n# CentOS/RHEL\nsudo dnf install nginx\n\n# Start and enable NGINX\nsudo systemctl start nginx\nsudo systemctl enable nginx'
      },
      {
        type: 'heading',
        content: 'Basic Configuration Structure'
      },
      {
        type: 'paragraph',
        content: 'NGINX configuration files are typically located in /etc/nginx/. The main configuration file is nginx.conf, with site-specific configurations in the sites-available/ directory.'
      },
      {
        type: 'code',
        content: '# Main directories and files\n/etc/nginx/                  # Main configuration directory\n/etc/nginx/nginx.conf        # Main configuration file\n/etc/nginx/sites-available/  # Site configurations\n/etc/nginx/sites-enabled/   # Symlinks to enabled sites\n/var/log/nginx/             # Log files\n/var/www/html/              # Default web root'
      },
      {
        type: 'heading',
        content: 'Creating a Basic Site Configuration'
      },
      {
        type: 'code',
        content: '# Create a new site configuration\nsudo nano /etc/nginx/sites-available/example.com\n\n# Basic configuration content\nserver {\n    listen 80;\n    server_name example.com www.example.com;\n\n    root /var/www/example.com;\n    index index.html index.htm index.php;\n\n    location / {\n        try_files $uri $uri/ =404;\n    }\n\n    # PHP handling (if needed)\n    location ~ \\.php$ {\n        include snippets/fastcgi-php.conf;\n        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;\n    }\n\n    # Deny access to hidden files\n    location ~ /\\. {\n        deny all;\n    }\n}\n\n# Enable the site by creating a symlink\nsudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/\n\n# Test configuration and reload\nsudo nginx -t\nsudo systemctl reload nginx'
      },
      {
        type: 'heading',
        content: 'Setting Up a Reverse Proxy'
      },
      {
        type: 'paragraph',
        content: 'NGINX excels as a reverse proxy for applications running on local ports:'
      },
      {
        type: 'code',
        content: 'server {\n    listen 80;\n    server_name api.example.com;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection \'upgrade\';\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n}'
      },
      {
        type: 'heading',
        content: 'Performance Optimization'
      },
      {
        type: 'paragraph',
        content: 'NGINX can be optimized for better performance with these settings in nginx.conf:'
      },
      {
        type: 'code',
        content: '# Worker processes - set to number of CPU cores\nworker_processes auto;\n\n# Worker connections - adjust based on traffic\nevents {\n    worker_connections 1024;\n    multi_accept on;\n}\n\n# Keepalive settings\nhttp {\n    keepalive_timeout 65;\n    keepalive_requests 100;\n\n    # Buffer size settings\n    client_body_buffer_size 10K;\n    client_header_buffer_size 1k;\n    client_max_body_size 8m;\n    large_client_header_buffers 4 4k;\n\n    # Timeouts\n    client_body_timeout 12;\n    client_header_timeout 12;\n    send_timeout 10;\n\n    # Gzip compression\n    gzip on;\n    gzip_comp_level 5;\n    gzip_min_length 256;\n    gzip_proxied any;\n    gzip_vary on;\n    gzip_types\n        application/atom+xml\n        application/javascript\n        application/json\n        application/ld+json\n        application/manifest+json\n        application/rss+xml\n        application/vnd.geo+json\n        application/vnd.ms-fontobject\n        application/x-font-ttf\n        application/x-web-app-manifest+json\n        application/xhtml+xml\n        application/xml\n        font/opentype\n        image/bmp\n        image/svg+xml\n        image/x-icon\n        text/cache-manifest\n        text/css\n        text/plain\n        text/vcard\n        text/vnd.rim.location.xloc\n        text/vtt\n        text/x-component\n        text/x-cross-domain-policy;\n\n    # File caching\n    open_file_cache max=1000 inactive=20s;\n    open_file_cache_valid 30s;\n    open_file_cache_min_uses 2;\n    open_file_cache_errors on;\n}'
      },
      {
        type: 'heading',
        content: 'Securing NGINX'
      },
      {
        type: 'list',
        items: [
          'Hide NGINX version: Add "server_tokens off;" to http block',
          'Disable unused HTTP methods: Use "limit_except GET POST" blocks',
          'Implement rate limiting to prevent brute force attacks',
          'Configure proper security headers',
          'Set up SSL/TLS (covered in the SSL Certificates guide)'
        ]
      },
      {
        type: 'heading',
        content: 'Monitoring and Logs'
      },
      {
        type: 'code',
        content: '# Log format configuration\nlog_format main \'$remote_addr - $remote_user [$time_local] "$request" \'\n                      \'$status $body_bytes_sent "$http_referer" \'\n                      \'"$http_user_agent" "$http_x_forwarded_for"\';\n\naccess_log /var/log/nginx/access.log main;\nerror_log /var/log/nginx/error.log;\n\n# View logs\ntail -f /var/log/nginx/access.log\ntail -f /var/log/nginx/error.log'
      },
      {
        type: 'heading',
        content: 'Useful Commands'
      },
      {
        type: 'code',
        content: '# Test configuration syntax\nsudo nginx -t\n\n# Reload configuration without downtime\nsudo systemctl reload nginx\n\n# Restart NGINX\nsudo systemctl restart nginx\n\n# Check status\nsudo systemctl status nginx'
      },
      {
        type: 'paragraph',
        content: 'With these configuration guidelines, you can set up a high-performance, secure NGINX web server for your applications. As your needs grow, explore more advanced features like load balancing, caching, and HTTP/3 support.'
      }
    ]
  }
];
