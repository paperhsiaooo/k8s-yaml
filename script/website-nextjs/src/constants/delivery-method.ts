export const DELIVERY_METHOD: Record<string, { Enabled: boolean; Key: string; Name: string }> = {
  HOME_DELIVERY: {
    Enabled: true,
    Key: 'Home',
    Name: '宅配到府',
  },
  SEVEN_ELEVEN_PICKUP: {
    Enabled: false,
    Key: '7-11',
    Name: '7-11 取貨',
  },
}
