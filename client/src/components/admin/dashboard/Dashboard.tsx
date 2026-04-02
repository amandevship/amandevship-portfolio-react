import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  Clock, 
  Activity,
  FolderOpen,
  Briefcase,
  Code,
  GraduationCap
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: string;
  description: string;
  timestamp: string;
  user: string;
}

export const Dashboard: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Visits',
      value: '12,543',
      change: '+12.5%',
      icon: Users,
      color: 'from-neon-cyan to-blue-500',
    },
    {
      title: 'Page Views',
      value: '34,210',
      change: '+8.2%',
      icon: Eye,
      color: 'from-flame to-orange-500',
    },
    {
      title: 'Avg. Duration',
      value: '3:24',
      change: '+18.1%',
      icon: Clock,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Bounce Rate',
      value: '32.4%',
      change: '-5.3%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'update',
      entity: 'Project',
      description: 'Updated Aramex project description',
      timestamp: '2 hours ago',
      user: 'You',
    },
    {
      id: '2',
      type: 'create',
      entity: 'Experience',
      description: 'Added new work experience at TO THE NEW',
      timestamp: '1 day ago',
      user: 'You',
    },
    {
      id: '3',
      type: 'update',
      entity: 'Skills',
      description: 'Added new skill: GraphQL',
      timestamp: '3 days ago',
      user: 'You',
    },
    {
      id: '4',
      type: 'create',
      entity: 'Project',
      description: 'Created new project: Wealth Concert',
      timestamp: '1 week ago',
      user: 'You',
    },
  ];

  const contentStats = [
    { label: 'Projects', value: '8', icon: FolderOpen, color: 'text-neon-cyan' },
    { label: 'Experience', value: '4', icon: Briefcase, color: 'text-flame' },
    { label: 'Skills', value: '24', icon: Code, color: 'text-green-500' },
    { label: 'Education', value: '1', icon: GraduationCap, color: 'text-purple-500' },
  ];

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'create':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'update':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'delete':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'create':
        return '↑';
      case 'update':
        return '✎';
      case 'delete':
        return '×';
      default:
        return '•';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
        <p className="text-text-secondary">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-space-dark/50 border border-neon-cyan/20 rounded-xl p-6 hover:border-neon-cyan/40 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Stats */}
      <div className="bg-space-dark/50 border border-neon-cyan/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Content Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contentStats.map((item, index) => (
            <div key={item.label} className="flex items-center space-x-3">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <div>
                <p className="text-lg font-semibold text-text-primary">{item.value}</p>
                <p className="text-sm text-text-secondary">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-space-dark/50 border border-neon-cyan/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
          <Activity className="w-5 h-5 text-neon-cyan" />
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-space-card/30 rounded-lg border border-neon-cyan/10"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-text-primary">
                  <span className="font-medium">{activity.user}</span> {activity.description.toLowerCase()}
                </p>
                <p className="text-sm text-text-secondary">
                  {activity.entity} • {activity.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-space-dark/50 border border-neon-cyan/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Add Project', href: '/projects/new' },
            { label: 'Update Profile', href: '/personal' },
            { label: 'Add Experience', href: '/experience/new' },
            { label: 'Manage Media', href: '/media' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary hover:bg-space-card hover:border-neon-cyan/40 transition-all"
            >
              <p className="font-medium">{action.label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
