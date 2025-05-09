module.exports = {
  networks: {
    neondevnet: {
      url: "https://devnet.neonevm.org",
      chainId: 245022926,
      accounts: [process.env.PRIVATE_KEY_OWNER],
    },
  }
};