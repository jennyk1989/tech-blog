// seeds for some posts
const { Post } = require('../models');

const postSeeds = () => Post.bulkcreate([
    {
        title: 'Tech News Today',
        post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        user_id: 1
    },
    {
        title: 'Tech in the Past',
        post_text: 'Sit amet porttitor eget dolor morbi non arcu risus. A lacus vestibulum sed arcu non. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Tincidunt eget nullam non nisi. Et ultrices neque ornare aenean euismod elementum nisi.', 
        user_id: 2
    },
    {
        title: 'Tech in the Future',
        post_text: 'Viverra aliquet eget sit amet tellus cras adipiscing enim. Mauris augue neque gravida in fermentum et sollicitudin ac. Consectetur adipiscing elit duis tristique sollicitudin nibh. Et malesuada fames ac turpis egestas sed.',       
        user_id: 3
    },

]);

module.exports = postSeeds;
