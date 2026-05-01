import { formatDistanceToNow } from 'date-fns';
import type { Driver, Load } from './api';

type Language = 'sw' | 'en';

const UNKNOWN_LABEL = {
  sw: 'Haijulikani',
  en: 'Unknown',
};

const NOT_SET_LABEL = {
  sw: 'Haijawekwa',
  en: 'Not set',
};

const statusLabels = {
  sw: {
    open: 'Inasubiri',
    assigned: 'Imepangiwa Dereva',
    in_transit: 'Njiani',
    delivered: 'Imefika',
    cancelled: 'Imeghairiwa',
  },
  en: {
    open: 'Open',
    assigned: 'Assigned',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  },
};

const dayNames = {
  sw: ['J2', 'J3', 'J4', 'J5', 'Alh', 'Ijm', 'J1'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

export function getLoadStatusLabel(status: Load['status'], language: Language) {
  if (!status) {
    return statusLabels[language].open;
  }

  return statusLabels[language][status] || status;
}

export function getLoadProgress(status: Load['status']) {
  switch (status) {
    case 'assigned':
      return 40;
    case 'in_transit':
      return 72;
    case 'delivered':
      return 100;
    case 'cancelled':
      return 0;
    case 'open':
    default:
      return 18;
  }
}

export function getNextLoadStatus(status: Load['status']) {
  if (status === 'assigned') {
    return 'in_transit';
  }

  if (status === 'in_transit') {
    return 'delivered';
  }

  return null;
}

export function getLoadRoute(load: Load, language: Language) {
  return {
    from: load.pickupCity || load.pickupLocation || UNKNOWN_LABEL[language],
    to: load.deliveryCity || load.deliveryLocation || UNKNOWN_LABEL[language],
  };
}

export function getLoadTitle(load: Load, language: Language) {
  return load.cargoType || load.loadType || (language === 'sw' ? 'Mzigo' : 'Load');
}

export function getLoadValue(load: Load) {
  if (typeof load.price === 'number') {
    return load.price;
  }

  if (typeof load.budget === 'number') {
    return load.budget;
  }

  return 0;
}

export function formatCurrency(value: number, language: Language, compact = false) {
  if (!Number.isFinite(value) || value <= 0) {
    return NOT_SET_LABEL[language];
  }

  return new Intl.NumberFormat(language === 'sw' ? 'sw-KE' : 'en-US', {
    style: 'currency',
    currency: 'UGX',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);
}

export function formatWeight(weight: number | undefined, language: Language) {
  if (typeof weight !== 'number' || Number.isNaN(weight) || weight <= 0) {
    return NOT_SET_LABEL[language];
  }

  return `${weight} ${language === 'sw' ? 'tani' : 'tons'}`;
}

export function getDriverPrimaryTruck(driver: Driver, language: Language) {
  return driver.truckTypes?.[0] || (language === 'sw' ? 'Lori' : 'Truck');
}

export function getDriverCapacity(driver: Driver, language: Language) {
  if (typeof driver.maxWeight === 'number' && driver.maxWeight > 0) {
    return `${driver.maxWeight} ${language === 'sw' ? 'tani' : 'tons'}`;
  }

  return language === 'sw' ? 'Uwezo haujawekwa' : 'Capacity not set';
}

export function getDriverAvailabilityLabel(driver: Driver, language: Language) {
  if (driver.availability?.from) {
    return formatDistanceToNow(new Date(driver.availability.from), { addSuffix: true });
  }

  switch (driver.availability?.status) {
    case 'busy':
      return language === 'sw' ? 'Ana shughuli' : 'Busy';
    case 'off':
      return language === 'sw' ? 'Hayupo mtandaoni' : 'Offline';
    case 'available':
    default:
      return language === 'sw' ? 'Yupo tayari leo' : 'Available today';
  }
}

export function getRelativeEta(load: Load, language: Language) {
  if (load.status === 'delivered') {
    return language === 'sw' ? 'Imekamilika' : 'Completed';
  }

  if (load.deliveryDate) {
    return formatDistanceToNow(new Date(load.deliveryDate), { addSuffix: true });
  }

  if (load.pickupDate) {
    return formatDistanceToNow(new Date(load.pickupDate), { addSuffix: true });
  }

  return language === 'sw' ? 'Tarehe haijawekwa' : 'Schedule pending';
}

function sameMonth(dateA: Date, dateB: Date) {
  return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}

function sameDay(dateA: Date, dateB: Date) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function parseLoadDate(load: Load) {
  const raw = load.updatedAt || load.createdAt || load.deliveryDate || load.pickupDate;
  return raw ? new Date(raw) : null;
}

export function getMonthlySpendSeries(loads: Load[], language: Language) {
  const locale = language === 'sw' ? 'sw-KE' : 'en-US';
  const now = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const monthLoads = loads.filter((load) => {
      const date = parseLoadDate(load);
      return date ? sameMonth(date, monthDate) : false;
    });

    return {
      month: monthDate.toLocaleString(locale, { month: 'short' }),
      spend: monthLoads.reduce((sum, load) => sum + getLoadValue(load), 0),
      shipments: monthLoads.length,
    };
  });
}

export function getWeeklyEarningsSeries(loads: Load[], language: Language) {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() - (6 - index));

    const dayLoads = loads.filter((load) => {
      const date = parseLoadDate(load);
      return date ? sameDay(date, dayDate) : false;
    });

    return {
      day: dayNames[language][index],
      amount: dayLoads.reduce((sum, load) => sum + getLoadValue(load), 0),
    };
  });
}
